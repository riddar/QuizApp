#QuizApp#
**Uppgiften**
Ni ska skapa en quiz-app där man kan tävla mot andra användare i att svara på frågor. 
Användare ska kunna registrera sig, logga in och svara på ett lagom antal frågor. 
Man ska kunna se tidigare tävlandes poäng (high score). 
Frågorna ska lagras i en databas. 
Gärna med Entity Framework och gärna databas i Azure-molnet. 
Frågorna ska hämtas till frontend/React med hjälp av AJAX och WebAPI. 
Dvs appen ska använda AJAX för att hämta data från en controller som ni skriver. 
Appen ska så långt det är möjligt vara en SPA-app, men det är ok att göra undantag för autentisering. 
När en användare svarat på alla frågor ska poängen sparas i databasen med AJAX. 
En administratör ska kunna lägga till nya frågor.

**Quiz**
När användaren går in på "Quiz" på webbappen ska man kunna välja att starta quizzen. En fråga visas i taget. 
Användaren väljer ett av alternativen. Appen visar om det var rätt eller fel och sparar användarens poäng. 
Nästa fråga visas när användaren väljer att gå vidare. När sista frågan har besvarats ska resultatet visas och användaren ska kunna starta en ny quiz. 
Poängen ska sparas till databasen med hjälp av AJAX och en WebAPI-funktion.
(Den som vill ha en extra utmaning kan göra så att användaren har en begränsad tid på sig att svara på varje fråga, innan det automatiskt registreras ett fel. Och dramatisk musik!)
**High score**
När användaren väljer att se high score så ska de bästa resultaten visas, 
sorterade i fallande ordning efter poäng i första hand och i andra hand efter datum. 
Resultaten ska hämtas med AJAX och WebAPI.
**Admin**
Om användaren är administratör ska man kunna lägga till frågor. 
På VG-nivå ska man kunna se, lägga till, redigera och ta bort frågor.
**Autentisering**
Användaren ska kunna registrera sig på lämpligt sätt. 
På VG-nivå ska ni använda minst en tjänst för federerad identitet: Microsoft, Google, Facebook, Twitter, GitHub osv.


