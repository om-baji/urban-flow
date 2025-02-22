"use client";
import React, { useState, useEffect } from "react";
import * as THREE from "three";

const mapOptions = {
  mapId: process.env.NEXT_PUBLIC_MAPID,
  center: { lat: 18.517436621033905, lng: 73.8560968090087 },
  zoom: 15,
  disableDefaultUI: true,
};

const Response = () => {
  useEffect(() => {
    const markers = [
      {
        locationName: "Area",
        lat: 18.58676425801763,
        lng: 73.90690857301867,
        address: "Default Address",
      },
      {
        locationName: "Area",
        lat: 18.601081948912995,
        lng: 73.81627137235225,
        address: "Default Address",
      },
    ];

    const initMap = () => {
      const map = new google.maps.Map(
        document.getElementById("google-map"),
        mapOptions
      );

      const locationButton = document.createElement("button");
      locationButton.style.color = "#32CD32";
      locationButton.style.fontSize = "1rem";
      locationButton.style.margin = "10px";
      locationButton.style.padding = "10px";
      locationButton.style.backgroundColor = "#fff";
      locationButton.style.border = "none";
      locationButton.style.borderRadius = "5px";
      locationButton.style.cursor = "pointer";
      locationButton.style.position = "absolute";
      locationButton.style.bottom = "10px";
      locationButton.style.left = "50%";
      locationButton.style.transform = "translateX(-50%)";

      locationButton.textContent = "Pan to Current Location";
      locationButton.classList.add("custom-map-control-button");
      map.controls[google.maps.ControlPosition.BOTTOM_CENTER].push(locationButton);
      locationButton.addEventListener("click", () => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
              };

              infoWindow.setPosition(pos);
              infoWindow.setContent(`
                <h1 class='text-black'> Location found. </h1>
                `);
              infoWindow.open(map);
              map.setCenter(pos);
            },
            () => {
              handleLocationError(true, infoWindow, map.getCenter());
            }
          );
        } else {
          handleLocationError(false, infoWindow, map.getCenter());
        }
      });

      const infoWindow = new google.maps.InfoWindow({
        minWidth: 200,
        maxWidth: 200,
      });

      const bounds = new google.maps.LatLngBounds();

      markers.map((value, index) => {
        const marker = new google.maps.Marker({
          position: { lat: value["lat"], lng: value["lng"] },
          map: map,
          draggable: false,
          animation: google.maps.Animation.DROP,
          icon: "/icon/work-location.png",
        });

        function createInfoWindow() {
          const infoWindowContent = `
                    <div class='feh-content text-black'>
                        Here we can add the Fatality Dashboard
                    </div>
                    `;

          google.maps.event.addListener(marker, "click", () => {
            infoWindow.setContent(infoWindowContent);
            infoWindow.open(map, marker);

            map.moveCamera({
              center: { lat: value["lat"], lng: value["lng"] },
              heading: 0,
              tilt: 45,
              zoom: 19.90,
            });

            let heading = 0;
            let animationFrameId;

            const rotate = () => {
              heading = (heading + 0.1) % 360;
              map.moveCamera({ heading });
              animationFrameId = requestAnimationFrame(rotate);
            };

            rotate();

            google.maps.event.addListener(map, "mousedown", () => {
              cancelAnimationFrame(animationFrameId);
            });
          });
        }

        bounds.extend(new google.maps.LatLng(value["lat"], value["lng"]));
        map.fitBounds(bounds);

        createInfoWindow();
      });

      // Initialize Three.js
      const renderer = new THREE.WebGLRenderer({ alpha: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      document.getElementById("google-map").appendChild(renderer.domElement);

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      camera.position.z = 5;

      const geometry = new THREE.BoxGeometry();
      const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
      const cube = new THREE.Mesh(geometry, material);
      scene.add(cube);

      const animate = () => {
        requestAnimationFrame(animate);
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
        renderer.render(scene, camera);
      };

      animate();
    };

    function handleLocationError(browserHasGeolocation, infoWindow, pos) {
      infoWindow.setPosition(pos);
      infoWindow.setContent(
        browserHasGeolocation
          ? "Error: The Geolocation service failed."
          : "Error: Your browser doesn't support geolocation."
      );
      infoWindow.open(map);
    }

    console.log(process.env.GOOGLEMAP_API);
    const script = document.createElement("script");
    script.src = `${process.env.NEXT_PUBLIC_GOOGLEMAP_URI}`;
    script.defer = true;
    script.async = true;
    window.initMap = initMap;
    document.head.appendChild(script);

    return () => {
      console.log("Clean up");
    };
  }, []);

  return (
    <div className="relative w-full">
      <div
        className="google-map flex border-2 border-black w-screen h-screen justify-center align-center"
        id="google-map"
      ></div>
    </div>
  );
};

export default Response;