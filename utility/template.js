import { envVariables } from "../config/config.js";

const { BACKENDURL } = envVariables;
export const landing = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Admin Panel</title>
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap" rel="stylesheet">
      <style>
        body { font-family: Outfit; text-align: center; }
        h1 { color: #4CAF50; }
      </style>
    </head>
    <body>
      <h1>Welcome to the chat Application!</h1>
      <p>Your website is running successfully.</p>
    </body>
    </html>
  `;

export const unKnownRoute = `
  <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>404 - Page Not Found</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            font-family: 'Arial', sans-serif;
            background-color: #f4f4f4;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            color: #333;
        }

        .container {
            text-align: center;
        }

        h1 {
            font-size: 8rem;
            margin: 0;
            color: #ff6b6b;
        }

        h2 {
            font-size: 2rem;
            margin-bottom: 20px;
        }

        p {
            font-size: 1.2rem;
            margin-bottom: 30px;
        }

        a {
            padding: 10px 20px;
            font-size: 1rem;
            color: white;
            background-color: #007bff;
            text-decoration: none;
            border-radius: 5px;
            transition: background-color 0.3s ease;
        }

        a:hover {
            background-color: #0056b3;
        }
    </style>
</head>
<body>

    <div class="container">
        <h1>404</h1>
        <h2>Oops! Page Not Found</h2>
        <p>Sorry, the page you're looking for doesn't exist or has been moved.</p>
        <a href=${BACKENDURL}>Go Back to Home</a>
        &nbsp or &nbsp
        <a href=${BACKENDURL}/api-docs/>Go to the API Doc.</a>
    </div>

</body>
</html>
  `;

export const otpTemplate = (username, otp, expiresIn) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>OTP Verification</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 20px;
        }
        .container {
            background-color: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            max-width: 600px;
            margin: auto;
        }
        h2 {
            color: #333;
        }
        .otp-code {
            font-size: 24px;
            font-weight: bold;
            color: #4CAF50;
        }
        .expiry {
            color: #FF5733;
            font-weight: bold;
        }
        .footer {
            margin-top: 20px;
            font-size: 12px;
            color: #777;
        }
    </style>
</head>
<body>
    <div class="container">
        <h2>Hii ${username},</h2>
        <p>Your OTP code is <span class="otp-code">${otp}</span>.</p>
        <p class="expiry">This code will expire in ${expiresIn} minutes.</p>
        <p>Thank you for using our service!</p>
        <div class="footer">
            <p>If you did not request this code, please ignore this email.</p>
        </div>
    </div>
</body>
</html>
`;
