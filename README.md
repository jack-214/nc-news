# NC News Front-End

## Live Site

[Visit the deployed app](https://northcoders-news-jack-ho.netlify.app)

> The default user logged in is `jessjelly`.

---

## About the Project

This app is a React-based front-end that interacts withe the NC News back-end API.

Users can:

- Browse articles by topic
- Vote on articles
- View single article details
- Post and delete own comments
- See vote counts and comment counts
- Get error messages for invalid routes or requests

Built with:

- React
- React Router
- Context API
- Fetch API for backend communication
- Day.js for time formatting

--

## Back-End Repository

[NC News Back-End Repo](https://github.com/jack-214/northcoders-news-BE)

The back-end is a RESTful API hosted on Render.

---

## Getting Started Locally

### Node Version

Minimum Node version required: **v18.0.0**

Check your version with:

```bash
node --version
```

---

### Local Installation Steps

1. **Clone the repo**

```bash
git clone https://github.com/jack-214/nc-news.git
```

2. **Navigate into the project directory**

```bash
cd nc-news
```

3. **Install dependencies**

```bash
npm install
```

4. **Run the app locally**

```bash
npm run dev
```

This will start a development server, typically at [http://localhost:5173](http://localhost:5173).

---

## Features Overview

| Feature             | Description                                   |
| ------------------- | --------------------------------------------- |
| Article Feed        | Browse and sort news articles                 |
| Single Article View | View full content and related comments        |
| Commenting          | Add a comment                                 |
| Delete Comment      | Delete your own comments                      |
| Error Handling      | Friendly error messages for all failure types |

---

## Future Improvements

- Voting system for comments
- User authentication flow (login/logout)
- Pagination for articles and comments

---

## Acknowledgements

This portfolio project was created as part of a Digital Skills Bootcamp in Software Engineering provided by [Northcoders](https://northcoders.com/)
