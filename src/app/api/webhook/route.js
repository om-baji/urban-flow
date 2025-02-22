"use server";
import mongoConnect from "@/mongodb/connection";
import { UserModel } from "@/mongodb/models/user/user.model";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { Webhook } from "svix";

export async function POST(request) {
    const webhook_secret = process.env.WEBHOOK_SECRET;

    if (!webhook_secret) {
        throw new Error("No webhook secret!");
    }

    const payload = await request.json();
    const body = JSON.stringify(payload);
    const headersList = headers();
    const wh = new Webhook(webhook_secret);
    let evt;

    await mongoConnect();

    try {
        evt = wh.verify(body, {
            "svix-id": headersList.get("svix-id"),
            "svix-signature": headersList.get("svix-signature"),
            "svix-timestamp": headersList.get("svix-timestamp"),
        });

        console.log(evt);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Webhook verification failed" }, { status: 400 });
    }

    const { id } = evt.data;
    const eventType = evt.type;

    if (eventType === "user.created") {
        try {
            const { email_addresses, primary_email_address_id } = evt.data;
            const email = email_addresses.find(
                (email) => email.id === primary_email_address_id
            );
            console.log(id,email)
            const user = new UserModel({
                clerk_id : id,
                email: email?.email_address,
            });

            await user.save();
            console.log("User created!");
        } catch (error) {
            console.log(error);
            return NextResponse.json({ message: "Database error" }, { status: 500 });
        }
    }

    return new Response("Webhook received", { status: 200 });
}