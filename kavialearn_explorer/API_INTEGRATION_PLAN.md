# KaviaLearn Explorer: API Integration Plan

This document outlines the proposed application architecture for integrating the following public/free APIs into the React-based KaviaLearn Explorer app. It maps out where and how each API is to be consumed, specifying the responsible component/hook and providing rationale and example request patterns for developers.

---

## 1. API Integration Mapping

| API                        | Intended Panel/Component(s)          | Responsible Code Module / Hook                | Usage Description / Rationale                                                       |
|----------------------------|--------------------------------------|-----------------------------------------------|-------------------------------------------------------------------------------------|
| **Kavia AI**               | MainContainer, AnalysisPanel         | `useKaviaAI` hook, ActionBar/Sidebar          | Natural language analysis, Q&A, explanations, summarizations                        |
| **Math.js**                | CalculationPanel, VisualizationPanel | `useMathJS` hook, CalculationInput, Graph     | Precise math computation, formula evaluation, generate plot data                    |
| **NASA**                   | VisualizationPanel                   | `useNASA` hook, NASAImageCard, NASADataView   | Fetch space/astronomy images, educational facts, show in visualizations             |
| **OpenWeatherMap**         | DataPanel, VisualizationPanel        | `useWeather`, WeatherDisplay                  | Retrieve and display current weather, historical data for science studies           |
| **World Bank**             | DataPanel, AnalysisPanel             | `useWorldBank`, DataChart, CountrySelector    | Fetch real-world statistics, economics data, support data-driven exploration        |
| **Wikipedia**              | InfoPanel, SidePanel                 | `useWikipedia`, WikiSummary                   | Get fast information/definitions for any concept, on-demand explanations            |
| **PhET Simulations**       | VisualizationPanel, InteractionPanel | `usePhET`, PhETSimEmbed                      | Embed interactive science/math simulations, enable direct exploration by users      |
| **ZenQuotes/JokeAPI**      | Sidebar, MotivationBanner            | `useQuote`, `useJoke`, MotivationWidget       | Display random quotes/jokes for engagement, learning encouragement                  |

---

## 2. Integration Points & Component Structure

### ▸ **MainContainer**  
**Role:** Central container managing app state and data flow.  
**Integration:**  
- Coordinates hooks (e.g., `useKaviaAI`, `useWorldBank`, etc.)
- Routes API data to correct sub-panels.
- Handles high-level API error states and UI feedback.

---

### ▸ **Feature Panels & Sample Integration**

#### 2.1 **VisualizationPanel**  
- **Integrates:** NASA, Math.js, OpenWeatherMap, PhET Simulations
- **Components:** NASAImageCard, WeatherGraph, SimulationEmbed
- **Sample:**
    ```js
    // PUBLIC_INTERFACE
    const { nasaImage } = useNASA();     // NASA APOD
    const { plotData } = useMathJS(equation); // Math.js plot points
    const { simUrl } = usePhET('gravity');    // PhET sim embed
    ```

#### 2.2 **DataPanel / AnalysisPanel**
- **Integrates:** World Bank, OpenWeatherMap, Kavia AI
- **Components:** DataChart, AIAnalysisBox
- **Sample:**
    ```js
    const { worldBankData } = useWorldBank('SP.POP.TOTL', 'BRA');
    const { weatherHistory } = useWeather('New York');
    const { aiResponse, askAI } = useKaviaAI();
    ```

#### 2.3 **InfoPanel / SidePanel**
- **Integrates:** Wikipedia, ZenQuotes, JokeAPI
- **Components:** WikiSummary, MotivationWidget
- **Sample:**
    ```js
    const { summary } = useWikipedia('Photosynthesis');
    const { quote } = useQuote();
    const { joke } = useJoke();
    ```

#### 2.4 **CalculationPanel**
- **Integrates:** Math.js
- **Components:** CalculationInput
- **Sample:**
    ```js
    const { evaluate } = useMathJS();
    const result = evaluate('2 * sin(π / 4)');
    ```

---

## 3. API Usage Patterns & Example Calls

### 3.1 **Kavia AI**
- **Pattern:** Client-side fetch to Kavia AI endpoint for analysis/Q&A.
- **Example:**
    ```js
    async function askAI(question) {
      const resp = await fetch('/api/ask', {
        method: 'POST',
        body: JSON.stringify({ question }),
      });
      const { answer } = await resp.json();
      return answer;
    }
    ```
### 3.2 **Math.js**
- **Pattern:** Import lib or fetch via CDN/local API for computations.
- **Example:**
    ```js
    import { evaluate } from 'mathjs';
    const output = evaluate('3*(2+7)');
    ```
### 3.3 **NASA**
- **Pattern:** REST fetch to NASA open APIs (e.g., APOD, Mars Rover, etc.)
- **Example:**
    ```js
    async function fetchAPOD() {
      const resp = await fetch('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY');
      const data = await resp.json();
      return data.url;
    }
    ```
### 3.4 **OpenWeatherMap**
- **Pattern:** Fetch to OpenWeatherMap REST endpoints.
- **Example:**
    ```js
    async function getWeather(city) {
      const resp = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=API_KEY`);
      return await resp.json();
    }
    ```
### 3.5 **World Bank**
- **Pattern:** REST fetch for global development indicators.
- **Example:**
    ```js
    async function fetchWorldBank(code, country) {
      const url = `https://api.worldbank.org/v2/country/${country}/indicator/${code}?format=json`;
      const resp = await fetch(url);
      return await resp.json();
    }
    ```
### 3.6 **Wikipedia**
- **Pattern:** Fetch summary using Wikipedia REST API.
- **Example:**
    ```js
    async function getWikiSummary(title) {
      const resp = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`);
      return await resp.json();
    }
    ```
### 3.7 **PhET Simulations**
- **Pattern:** Embed via iframe using public URL for sim.
- **Example:**
    ```jsx
    <iframe src="https://phet.colorado.edu/sims/html/projectile-motion/latest/projectile-motion_en.html" />
    ```
### 3.8 **ZenQuotes/JokeAPI**
- **Pattern:** Fetch random quote/joke.
- **Example:**
    ```js
    async function getQuote() {
      const resp = await fetch('https://zenquotes.io/api/random');
      const [data] = await resp.json();
      return data.q;
    }
    async function getJoke() {
      const resp = await fetch('https://v2.jokeapi.dev/joke/Any');
      const data = await resp.json();
      return data.joke || `${data.setup}\n${data.delivery}`;
    }
    ```

---

## 4. Hooks & Utility Modules to be Created

- `useKaviaAI` – Q&A and analysis from Kavia AI endpoint
- `useMathJS` – Math computation using math.js library
- `useNASA` – NASA data/image fetching
- `useWeather` – Fetching weather data
- `useWorldBank` – Fetching demographic/economic indicators
- `useWikipedia` – Article/summary lookups
- `usePhET` – PhET simulation embed url getter
- `useQuote`, `useJoke` – APIs for motivational/fun content

Each feature panel/component will import and consume these hooks as needed to provide the feature described.

---

## 5. Appendix: Panel–API Mapping Table

| Feature Panel          | Consumed APIs                             |
|----------------------- |-------------------------------------------|
| VisualizationPanel    | NASA, Math.js, OpenWeatherMap, PhET       |
| DataPanel             | World Bank, OpenWeatherMap                |
| AnalysisPanel         | Kavia AI, World Bank                      |
| InfoPanel/SidePanel   | Wikipedia, ZenQuotes, JokeAPI             |
| CalculationPanel      | Math.js                                   |
| InteractionPanel      | PhET, ZenQuotes/JokeAPI                   |

---

**Note:** All API keys (where required) will be managed via environment variables or secured backend proxy endpoints in production builds.

---
