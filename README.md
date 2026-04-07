# 🌤️ SkyCast – Weather Forecast Application

 Overview
SkyCast is a modern and responsive weather forecast web application built using HTML, Tailwind CSS, and JavaScript. It allows users to check real-time weather conditions and a 5-day extended forecast for their current location or any city worldwide.
The app integrates with the OpenWeatherMap API to provide accurate and up-to-date weather data. SkyCast is optimized for multiple devices including **iPhone SE, iPad Mini, and desktop screens**, ensuring a smooth and user-friendly experience.

 Features

 Location-Based Weather

* Automatically detects the user’s current location
* Displays real-time weather details instantly

 City Search

* Search weather by entering any city name
* Quick and responsive search functionality

 Extended Forecast

* Displays a 5-day weather forecast
* Includes temperature, conditions, and trends


 Error Handling

* Displays meaningful error messages for:

  * Invalid city names
  * Network/API issues
  * Missing data

Tech Stack

* HTML → Structure of the application
* CSS  → Styling and responsive design
* JavaScript → Logic, API handling, DOM updates

---

File Structure

```
SkyCast/
│
├── index.html          # Main HTML file
│
├── /css
│   └── style.css       # Custom styles (loader, tweaks)
│
├── /js
│   ├── script.js          # Main logic & initialization

│
└── README.md           # Project documentation
```

 Usage

 Search Weather

* Enter a city name in the search bar
* Click the search button

 View Weather Details

* Current temperature 
* Weather condition 
* Humidity 
* Wind speed 

 Extended Forecast

* View weather predictions for the next 5 days

 Responsive Experience

* Automatically adapts to your device screen size



 API Integration

This project uses the OpenWeatherMap API to fetch weather data.

* Users can use the default API key provided
* OR replace it with their own in:

 File Details

* index.html → Main UI structure
* style.css → Custom styles (animations, loader)
* script.js → Main controller of the app

 Future Enhancements

*  Dark mode support
*  Live location tracking improvements
*  Weather icons & animations
*  Weather alerts & notifications
*  Hourly forecast charts

