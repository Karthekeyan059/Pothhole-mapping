# Smart Road Damage Mapping System

## Overview

Road damage is a problem that almost everyone experiences, yet there is no simple and scalable way for people to report potholes and damaged roads. Most potholes remain unnoticed until they become serious enough to cause vehicle damage, traffic disruptions, or accidents.

This project aims to solve that problem by automatically detecting potholes, mapping them on an interactive map, and providing actionable insights about the damage.

The platform combines Computer Vision, Geospatial Mapping, and Artificial Intelligence to create a continuously updated road condition monitoring system.

When a pothole is detected, it is automatically plotted on a map along with its location, severity, captured image, and an AI-generated overview of the resources required to repair it. This includes estimated repair cost, repair time, workforce requirements, and equipment recommendations, making maintenance planning significantly easier.

---

## The Problem

Road authorities and municipalities often depend on manual inspections or citizen complaints to identify damaged roads.

This creates several challenges:

* Many potholes go unreported.
* Reports are often incomplete or inaccurate.
* Road inspections require significant manpower.
* Repair planning becomes reactive rather than proactive.
* Authorities lack a real-time view of road conditions.

As cities grow, manually monitoring thousands of kilometers of roads becomes increasingly difficult.

---

## The Solution

The Smart Road Damage Mapping System automatically identifies potholes using AI and maps them in real time.

Instead of relying on people to manually report road damage, the system continuously monitors roads and generates a digital map of road conditions.

Each detected pothole contains:

* Location information
* GPS coordinates
* Captured image
* Severity estimation
* Repair recommendations
* Resource estimation
* Cost estimation
* Repair time estimation

This transforms road maintenance from a reactive process into a data-driven process.

---

## Current Architecture

The current prototype is built around a Raspberry Pi Zero 2 W and a camera module.

Because the Raspberry Pi Zero 2 W has limited computational power, running a large object detection model directly on the device is not practical.

Current pipeline:

```text
Camera Module
      ↓
Raspberry Pi Zero 2 W
      ↓
Video Streaming
      ↓
Edge Server
(Currently a Mobile Device)
      ↓
YOLOv8 Detection Model
      ↓
Pothole Detection
      ↓
Mapping & Visualization
      ↓
Dashboard
```

<img width="960" height="768" alt="ENVIRONMENT" src="https://github.com/user-attachments/assets/25a78228-1963-47dc-bca6-ab2f7a509d76" />


The Raspberry Pi acts as a lightweight data collection and streaming device, while the AI model runs on a more powerful edge server.

For the current development phase, the edge server is a mobile device, but the architecture is designed to support dedicated edge computing hardware in the future.

---

## Dashboard Features

### Interactive Map

All detected potholes are visualized on a map.

Users can:

* View pothole locations
* Inspect severity levels
* Analyze road conditions
* Monitor damage hotspots

### Pothole Preview

Hovering over a pothole displays:

* Captured image
* Location information
* GPS coordinates

### Detailed Information Panel

Selecting a pothole displays:

* Pothole image
* Severity score
* Location details
* AI-generated repair overview

### AI Repair Overview

The system estimates:

* Repair duration
* Workforce requirements
* Material requirements
* Estimated cost
* Recommended equipment

This feature is intended to assist planning and prioritization of maintenance activities.

---

## Technologies Used

### Frontend

* React.js
* React Leaflet
* OpenStreetMap

### Backend

* Node.js
* Express.js
* Flask

### AI

* YOLOv8
* OpenCV
* Python

### Hardware

* Raspberry Pi Zero 2 W
* Raspberry Pi Camera Module

---

# The Bigger Picture

The current prototype is only the first step.

The long-term vision is to create a distributed road monitoring network powered by vehicles already traveling on roads every day.

Imagine every vehicle having a small onboard AI-powered device integrated into:

* Dashcams
* Fleet cameras
* Public transportation systems
* Delivery vehicles
* Ride-sharing vehicles
* Personal vehicles

Each device continuously analyzes road conditions while driving.

When a pothole is detected:

```text
Vehicle
     ↓
Onboard AI
     ↓
Pothole Detection
     ↓
GPS Location
     ↓
Central Mapping Platform
```

<img width="1366" height="768" alt="ENVIRONMENT 2" src="https://github.com/user-attachments/assets/86d3029f-d660-4aa8-b500-a737d316562c" />


The platform aggregates reports from thousands of vehicles and continuously updates the road condition map.

Instead of inspecting roads periodically, cities can maintain a live, continuously updated digital twin of their road infrastructure.



 
