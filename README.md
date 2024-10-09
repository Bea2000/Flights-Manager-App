# Flight Information API

This project was developed as part of the Software Systems Architecture course (First Semester, 2024) at Pontificia Universidad Católica de Chile. The goal was to create a system that integrates with external flight data, provided via an MQTT broker, and displays this information through an API. The project emphasizes real-world software development practices, including cloud deployment, containerization, and integration of multiple components.

## Project Overview

The increasing popularity of airline applications for international travel has complicated the process of finding the best flight deals across various airlines. This project aims to provide a proof of concept for aggregating flight data from multiple airlines and exposing this data through a scalable web service. Additionally, it seeks to allow users to purchase tickets through a robust payment system, ensuring that all stakeholders can coordinate seamlessly.

## Key Objectives

- **Integration with MQTT Broker:** Subscribe to an MQTT broker that publishes flight information.
- **Flight Data Parsing:** Parse the flight information provided as JSON and store it in a database.
- **API for Flight Information:** Provide a web API to retrieve flight details, including filtering and pagination capabilities.
- **Purchase Requests:** Extend the API to connect to a broker channel for posting purchase requests and validating them to prevent overselling.
- **User Management:** Implement a user management system to ensure smooth transaction processes with Auth0.
- **Asynchronous Payment Processing:** Create a robust payment flow with integration to WebPay, allowing for formal payment processing through the application.
- **Flight Recommendations:** Implement a recommendation system for users based on their purchase history and preferences using Workers with Redis.

## Features

### Functional Requirements

- **Flight List API:** Provide endpoints to make different queries to the flight database, including filtering by departure and arrival airports, date, and time.

- **Purchase Requests:** Enable users to request the purchase of 1 to 4 tickets for a selected flight.
  - Request Format:
    ```json
    {
      "request_id": "uuid",
      "group_id": "string",
      "departure_airport": "<string>",
      "arrival_airport": "<string>",
      "departure_time": "<YYYY-MM-DD hh:mm (Chilean time)>",
      "datetime": "string",
      "deposit_token": "",
      "quantity": number,
      "seller": 0
    }
    ```

- **Payment Flow Integration:** 
  - When a user requests a purchase, send a request to WebPay to obtain a purchase token and include it in the purchase request sent to the broker.
  - Handle payment confirmations and notify users of the payment status.

- **Flight Recommendations:** 
  - After a user completes a purchase, generate flight recommendations based on their past flights and location.
  - Recommendations will be computed using user IP location and last flight destination.

### Non-Functional Requirements

- **MQTT Broker Integration:** Establish a persistent connection with the broker to receive flight events and store them in the database. The broker operates on the topic `flights/info`.
- **Validation Channel:** Listen to a validation channel to confirm purchase requests.
  - Response Format:
    ```json
    {
      "request_id": "string",
      "group_id": "string",
      "seller": 0,
      "valid": bool
    }
    ```

- **Worker Management:** Implement asynchronous workers to handle tasks such as payment processing and flight recommendations, ensuring good performance and responsiveness.

## Technology Stack

- **Web Framework:** NestJS for building the API.
- **MQTT Client:** MQTT.js for handling the connection to the broker.
- **Database:** PostgreSQL (with the option of using PostGIS for geospatial data).
- **Cloud Provider:** AWS EC2 for deployment.
- **Reverse Proxy:** NGINX with SSL (Let’s Encrypt).
- **Containerization:** Docker for service orchestration.
- **Frontend:** Next.js for the user interface.

## Installation - Prerequisites

- Docker installed locally or on an EC2 instance.
- AWS EC2 instance with open ports for HTTP (80) and HTTPS (443).
- NGINX installed on the EC2 instance for reverse proxy setup.
- Domain name with SSL certificates from Let’s Encrypt.

## Steps

1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/repo-name.git
    ```

2. Set up the environment variables in the `.env` file for the Backend:
    ```env
    DATABASE_USER={user}
    DATABASE_PASSWORD={password}
    DATABASE_PORT=5432
    DATABASE_NAME={db_name}
    DATABASE_HOST=db

    CELERY_BROKER_URL=redis://redis-broker:6379/0
    CELERY_RESULT_BACKEND=redis://redis-broker:6379/0
    REDIS_PORT=8000
    FLOWER_PORT=5555

    API_PORT=5000
    ```

3. Build and run the Docker containers:
    ```bash
    docker-compose up --build
    ```

4. Deploy the containers to the EC2 instance.

5. Configure NGINX for reverse proxy and SSL termination.

6. Use Let’s Encrypt to generate SSL certificates for the domain.

7. For the Frontend setup, change the `.env` file with the appropriate variables and run the Next.js application.
    ```[.env]
    NEXT_PUBLIC_AUTH0_SECRET=auth0_secret
    NEXT_PUBLIC_AUTH0_ISSUER_BASE_URL=suth0_issuer_url
    NEXT_PUBLIC_AUTH0_CLIENT_ID=auth0_client_id
    NEXT_PUBLIC_AUTH0_CLIENT_SECRET=auth0_client_secret
    NEXT_PUBLIC_AUTH0_AUDIENCE=auth0_audience
    NEXT_PUBLIC_API_BASE_URL=api_base_url
    NEXT_PUBLIC_BASE_URL=baseurl
    ```
    Run the Next.js application:
    ```bash
    npm install
    npm run dev
    ```

## Continuous Integration

Implement a CI pipeline using providers like CircleCI or GitHub Actions. This should include code linting and running basic tests to ensure the integrity of the application.

## Conclusion

This project serves as a comprehensive framework for managing flight information, user purchases, and payment processing while ensuring scalability and integration with modern technologies. It aims to provide a seamless experience for users and facilitate efficient management of flight data.
