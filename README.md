# Dark Matter Disco

A fun online virtual dancing app. Renders a dance avatar from the users webcam mimicking the users moves in real time. 

Pose recognition done with the TensorFlow model PoseNet: 
https://github.com/tensorflow/tfjs-models/tree/master/posenet

If dance avatar response is lagging, tweak the PoseNet configuration in src/dance-floor.component.ts.  See PoseNet documentation for configuration details.  In general faster configurations come at a cost of accuracy.


## Development server

Run `npm start` for a dev server. Navigate to `http://localhost:8080/`. 

## Development build

Run `npm run build-dev`.  This will run `ng build`, watch for src file changes and rebuild on changes.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Code scaffolding

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.0.3.

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

