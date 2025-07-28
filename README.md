# Hood Watch - Get to know your neighborhood

#### A platform to explore and connect with your local community and contribute to your neighborhood's safety and betterment. 

---

#### The easiest way to try out this project is by visitng https://hood-watch.netlify.app

But if you still want to see if the project can be set up within 5 minutes, follow these steps:

## Tools Setup

1. This project requires Node.js and Git (of course) to be installed on your computer

2. For the package manager and running the dev server etc., I'd personally recommend `pnpm` which you could install with the following command:

   ```
   npm install -g pnpm@latest-10
   ```

## Project Setup

1. Clone this repository onto your local machine:

   ```
   git clone https://github.com/usaidyf/hoodwatch
   ```

2. `cd` into your project and run `pnpm install`

3. Next, you'd need a random string to be set as the `AUTH_SECRET`. You could generate one using:

   ```
   openssl rand -base64 32
   ```

4. Create a `.env` file at the root of the repo having the following three variables:

   ```
   POSTGRES_URL="your_postgres_connection_string"
   AUTH_SECRET="your_auth_secret_here"
   NEXT_PUBLIC_BASE_URL="the_root_url_of_the_dev_server"
   ```

5. Run `pnpm dev` or `pnpm run dev` (first one saves some time though) in your terminal to run the project:

You should see the website running if you visit `http://localhost:3000`. That's it!