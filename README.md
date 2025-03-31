# Moovr (Front-End)

![Job Page Screenshot](/public/images/JobDetailPage.png)

This repository contains the front-end code for **Moovr**, a React-Django application that helps moving companies or individuals track items and boxes during relocations.

This project provided an opportunity to build a custom Django API and integrate it with a React front end. It also allowed me to refine my JavaScript and React skills by developing several dynamic and creative UI components. 

## Overview
### User Workflow:
- Unauthorized users can access the Home, About, and Log-In/Sign-Up pages. An account is required to access the main functionality.
- Once signed in, users can create, view, update, and delete move jobs, adding boxes that contain items. Box labels dynamically update based on their contents. Users can remove items and boxes when unpacking.

### Features:
- JWT Authentication with password validation and protected routes using a `<ProtectedRoute>` component.
- Full CRUD operations for multiple models.
- RESTful Routing.
- Custom dynamic breadcrumb menu and navigation bar.
- Intuitive UI with conditional rendering.
- Fully responsive for mobile devices.

[**Deployed App**](https://moovr.netlify.app/)

[**Back-End Repo**](https://github.com/adampaley/mern-media-match-back-end)

## Planning Materials:
- [Trello Board](https://trello.com/b/a6q0CveD/mediamatch)

## Attributions:
### Assets
- [Cow Icon](https://pngtree.com/freepng/brown-cow-in-line-style-standing-on-the-side-vector_12292741.html) by [PNG Tree](https://pngtree.com/)
- [Cow Print Background](https://pngtree.com/) by [PNG Tree](https://pngtree.com/)
- [Box Icon](https://pngtree.com/freepng/cardboard-box_7966242.html) by [PNG Tree](https://pngtree.com/)
- [Delete Icon](https://pngtree.com/freepng/delete-vector-icon_4236653.html) by [PNG Tree](https://pngtree.com/)
- [Fragile Icon](https://pngtree.com/element/down?id=NTA5MTY0NQ==&type=1&time=1743261318&token=YTM3MDk5OTZmODU3YzY2MGU4ZTIxNzM4NmQ3MzUzOWM=&t=0) by [PNG Tree](https://pngtree.com/)
- [Heavy Icon](https://www.flaticon.com/free-icon/heavy-things_5972022?term=heavy+box&page=1&position=6&origin=tag&related_id=5972022) by [Flat Icon](https://www.flaticon.com/)
- [Lamp Icon](https://pngtree.com/element/down?id=NDA5MTE5NA==&type=1&time=1743263204&token=NDk4MWI2NzdhYjJhMjRlYTA5NjA0ZGI2NTM1NmQ4ZDE=&t=0) by [PNG Tree](https://pngtree.com/)

### Libraries 
- Axios from [Axios](https://axios-http.com/)
- Date formatting from [date-fns](https://date-fns.org/)
- Date Picker from [React Datepicker](https://reactdatepicker.com/)
- Nav Hamburger styling from [Lucide React](https://lucide.dev/guide/packages/lucide-react)
- CSS Library from [Tailwind](https://tailwindcss.com/)
- React App built with [Vite](https://vite.dev/) 

## Built with:
![React](https://img.shields.io/badge/react-%2361DAFB?style=for-the-badge&logo=react&logoColor=black)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![Tailwind](https://img.shields.io/badge/tailwind-%2306B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![Node.js](https://img.shields.io/badge/node.js-%235FA04E?style=for-the-badge&logo=nodedotjs&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)
![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-0078d7.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white)

## Future Implementations:
- Integrate Google Maps for location validation and route generation.
- Implement many-to-many relationships for jobs and users, allowing user invitations.
- Add password recovery via email verification.
- Optimize performance with refactoring.
- Implement invoice generation.
