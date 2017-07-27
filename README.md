# VacaCountdown

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.1.3 and then modified to suit my needs.  It was created for an Angular 2+ presentation for the Springfield .NET User Group held on 7/25/2017.  It shows how to setup a relatively simple Angular project that shows off some basic features of the framework while also solving a practical purpose.  It leverages [NgCharts](https://valor-software.com/ng2-charts/) and [NgBootstrap](https://ng-bootstrap.github.io/#/home)

## Development server

### WebAPI
- Install [.NET Core Command Line](https://www.microsoft.com/net/core/#windowscmd)
- With Visual Studio Code
  - Install [Visual Studio Code](https://code.visualstudio.com/)
  - Add C# extension
  - Open root folder in VS Code
  - Press `F5` (there will be errors because the NuGet packages will need to be restored)
  - Open `api\Program.cs` (you will see errors, but also a popup will show prompting you to Restore packages)
  - Click *Restore*
  - Press `F5` again and application should launch in browser
  - Navigate to http://localhost:5000/api/ptousage (and confirm you get json data back)
- Command Line
  - `cd api`
  - `dotnet restore`
  - `dotnet run --project .\api.csproj`
  - Open browser and navigate to http://localhost:5000/api/ptousage (and confirm you get json data back)

### Angular Frontend
- Install [Node.js](https://nodejs.org/en/download/)
- in console, `npm install -g @angular/cli`
- in root folder `npm install`
- `ng serve`
- Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.
