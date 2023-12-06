## Real Estate Web Application

<p>This project is a <strong>personal real estate web application</strong> built using <em>Next.js</em>. It's a showcase of my skills in modern web development, integrating technologies like <em>Prisma</em> and <em>Node</em>, along with <em>Google Auth 2</em> for user registration.<br><br></p>


## How to Run the Web Application

First, you need to install the node modules. Open your terminal, navigate to the main application directory and run this line:

```bash
npm install
```

Then you need to run the development server:

```bash
npm run dev
```

Update .env file


Due to security risks, I had to delete the link to the database, and the API keys for Google registration. If you want to run the application, add the link of your MonogDB database, as well as the API keys from your Google console.

```bash
DATABASE_URL="ADD_DATABASE_LINK_HERE"
NEXTAUTH_SECRET="NEXTAUTH_SECRET"

GOOGLE_CLIENT_ID="ADD_GOOGLE_CLIENT_ID_HERE"
GOOGLE_CLIENT_SECRET="ADD_GOOGLE_CLIENT_SECRET_HERE"
NEXTAUTH_URL=http://localhost:3000

NEXT_PUBLIC_GOOGLEMAPSKEY="ADD_NEXT_PUBLIC_GOOGLEMAPSKEY_HERE"
```



Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.<span><br><br></span>


## Application Features

<p>The application offers a variety of features for exploring and managing real estate listings:</p>
<ul>
    <li>A comprehensive list of available real estate objects.</li>
    <li>An interactive map displaying the location of each object.</li>
    <li>Advanced filtering options to narrow down search results.</li>
    <li>Functionality for users to mark their favourite objects.</li>
    <li>Capability for users to upload and manage their own real estate listings.</li>
    <li>Functional Admin Panel</li>
    <br><br>
</ul>

## Screenshots of main parts of the Web Application

<h3>1) Home Page</h3>

  ![de_1](https://github.com/Damjan9898/Realestate-Next.js-project/assets/73915350/08e934a8-8880-4efb-ac89-6e3ea3021033)

<h3>2) Product View</h3>

  ![de_2](https://github.com/Damjan9898/Realestate-Next.js-project/assets/73915350/a9bcc51e-15ec-4b1a-8a54-290ee8704edd)

<h3>3) Registration ( With Google OAuth 2.0 )</h3>

  ![de_3](https://github.com/Damjan9898/Realestate-Next.js-project/assets/73915350/80845d3b-6e68-4ea3-ae14-52a148c12965)

<h3>4) Add New Post</h3>

  ![de_4](https://github.com/Damjan9898/Realestate-Next.js-project/assets/73915350/23c4d7dd-882b-49b8-97a2-4684af36c538)

<h3>5) Users Posts</h3>

  ![de_5](https://github.com/Damjan9898/Realestate-Next.js-project/assets/73915350/be5aa9a5-de6a-4e52-ad64-6b6f362a23aa)






