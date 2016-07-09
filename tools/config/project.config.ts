import { join } from 'path';

import { SeedConfig } from './seed.config';

/**
 * This class extends the basic seed configuration, allowing for project specific overrides. A few examples can be found
 * below.
 */
export class ProjectConfig extends SeedConfig {

  PROJECT_TASKS_DIR = join(process.cwd(), this.TOOLS_DIR, 'tasks', 'project');

  FONTS_DEST = `${this.APP_DEST}/fonts`;
  
  API_DEST = 'http://localhost:3000/api/';

  FONTS_SRC = [
    'node_modules/font-awesome/fonts/**'
  ];
  constructor() {
    super();
    // this.APP_TITLE = 'Put name of your app here';

    //Stystem Js additional config
    
    this.SYSTEM_CONFIG_DEV.paths['@angular2-material/core'] = 
     `${this.APP_BASE}node_modules/angular2-material/core`;

    this.SYSTEM_BUILDER_CONFIG.packages['@angular2-material/core'] = 
      {
        main: 'core.js',
        defaultExtension: 'js'
      } 

    this.SYSTEM_CONFIG_DEV.paths['@angular2-material/checkbox'] = 
     `${this.APP_BASE}node_modules/angular2-material/checkbox`;

    this.SYSTEM_BUILDER_CONFIG.packages['@angular2-material/checkbox'] = 
      {
        main: 'checkbox.js',
        defaultExtension: 'js'
      } 
    this.SYSTEM_BUILDER_CONFIG.packages['angular2-jwt'] = 
      {
        main: 'angular2-jwt.js',
        defaultExtension: 'js'
      } 
    // Add third-party libraries to be injected/bundled.
    this.NPM_DEPENDENCIES = [
      ...this.NPM_DEPENDENCIES,
      {src: 'font-awesome/css/font-awesome.min.css', inject: true}
      // {src: 'jquery/dist/jquery.min.js', inject: 'libs'},
      // {src: 'lodash/lodash.min.js', inject: 'libs'},
    ];

    /* Add to or override NPM module configurations: */
    //this.mergeObject(this.PLUGIN_CONFIGS['browser-sync'], { ghostMode: false });
  }

}
