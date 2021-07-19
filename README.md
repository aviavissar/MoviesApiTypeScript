# MoviesApi
## fetch movies infotmation from omdb api and display
### React & TypeScript

### The requirements
App 
• First page will be login page with name input and button. If the user already signup it will be  redirect to next page automatically (sessionStorage).  
• The second page will contain the name he enters at the top, a button to see favorite movies  and a single search box in the middle.  
• Once the user enters text (preferably without require to click ‘enter’) the search box is moved  to the top of the screen and there is a loader.  
• Once the search query return, we want a grid of cards for each movie that match the search,  or an empty state if no movie is found.  
• Every time the user changes the text in the search box the current results should be cleared,  if the user clears the search text the search box should return to the middle of the screen like  the user did a refresh on the page.  
• Each card search result should have a photo, the name of the movie, its year, and a favorite  button.  
• When clicking on a card, there should be a pop-up with the movie photo, name, year, short  plot, and a button to expand to the full plot). 
• When clicking on the favorite button, save or remove the movie from the sessionStorage. • the user can see all his favorite movies if he clicks the favorite button at the top. 
Implementation Details 
Your application should be responsive (use SCSS) with appropriate handling of at least three breakpoints: desktop, tablet (portrait), and mobile (portrait). 
It is entirely up to you how you display the app UI and data for each breakpoint. 



In the project directory, you can run:

### `npm run start`


