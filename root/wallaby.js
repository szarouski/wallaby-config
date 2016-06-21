'use strict';
const path = require('path');
module.exports = function (wallaby) {
    const babelCompiler = wallaby.compilers.babel({
        babel: require('babel-core'),
        "presets": ["es2015", "react", "stage-3"],
        "plugins": ["transform-object-rest-spread"]
    });
    const wallabyWebpack = require('wallaby-webpack');
    const webpackPostprocessor = wallabyWebpack(
        {
            "devtool": "source-map",
            "externals": {
                "jsdom": "window",
                "cheerio": "window",
                "react/lib/ExecutionEnvironment": true,
                "react/lib/ReactContext": "window"
            },
            "resolve": {
                "root": [
                    path.join(wallaby.projectCacheDir, "bower_components"),
                    path.join(wallaby.projectCacheDir, "AssetsExternal"),
                    path.join(wallaby.projectCacheDir, "live-style-guide"),
                    path.join(wallaby.projectCacheDir, "test/fixtures")
                ],
                "modulesDirectories": [
                    path.join(wallaby.projectCacheDir, "node_modules"),
                    path.join(wallaby.localProjectDir, '..', 'node_modules')
                ],
                "extensions": ["", ".js"],
                "alias": {
                    "react$": "react/dist/react-with-addons",
                    "react-dom$": "react-dom/dist/react-dom",
                    "react-dom/server$": "react-dom/dist/react-dom-server",
                    "babel-polyfill": "babel-polyfill/dist/polyfill",
                    "app-sandbox": "app-sandbox/lib/sandbox",
                    "pwstrength-bootstrap": "pwstrength-bootstrap/dist/pwstrength-bootstrap-1.2.5",
                    "_": "lodash",
                    "lodash": "lodash",
                    "jquery-validation": "jquery-validation/dist/jquery.validate",
                    "jquery.AreYouSure": "jquery.AreYouSure/jquery.are-you-sure.js",
                    "jquery-text-diff": "jquery-prettytextdiff/jquery.pretty-text-diff",
                    "jquery.cookies": "jquery-extensions/jquery.cookies.2.2.0",
                    "ProgressCircle": "progress-circle/ProgressCircle",
                    "jqueryMigrate": "jquery-migrate/jquery-migrate",
                    "jquery.dotdotdot": "jquery.dotdotdot/src/js/jquery.dotdotdot",
                    "jquery-hoverIntent": "jquery-hoverIntent/jquery.hoverIntent",
                    "knockout": "knockout/dist/knockout.debug",
                    "Modernizr": "modernizr/modernizr-2.8.2",
                    "paypalCIX": "paypal/paypalincontextjs-checkout",
                    "handlebars": "handlebars/runtime.js",
                    "react-addons-test-utils": "compiled-react-addons-test-utils",
                    "sinon": "sinon/pkg/sinon",
                    "koPostbox": "knockout-postbox/build/knockout-postbox"
                }
            },
            "resolveLoader": {
                "modulesDirectories": ["node_modules"],
                "moduleTemplates": ["*-loader", "*"],
                "extensions": ["", ".js"]
            },
            "module": {
                "loaders": [
                    {
                        "test": [
                            /jquery\.cookies\.2\.2\.0/,
                            /jquery\.are-you-sure\.js/,
                            /jquery\.validate\.js/,
                            /jquery\.placeholder\.js/,
                            /pwstrength-bootstrap-1\.2\.5\.js/,
                            /jquery-migrate\.js/,
                            /jquery\.dotdotdot/,
                            /jquery\.hoverIntent/,
                            /jquery\.ba-bbq/,
                            /jquery\.formatCurrency-1\.4\.0\.min/,
                            /jquery\.formatCurrency\.all\.js/,
                            /jquery\.form\.3\.27\.0\.js/,
                            /jquery\.lazyload/,
                            /jquery\.global_carousel\.js/,
                            /jquery\.timeago\.js/,
                            /knockout[\\/]dist[\\/]knockout/
                        ],
                        "loader": "imports",
                        "query": {"jQuery": "jquery"}
                    }, {
                        "test": /jquery\.pretty-text-diff/,
                        "loader": "imports?jQuery=jquery,diff_match_patch=diff-match-patch,DIFF_INSERT=>diff_match_patch.DIFF_INSERT,DIFF_DELETE=>diff_match_patch.DIFF_DELETE,DIFF_EQUAL=>diff_match_patch.DIFF_EQUAL"
                    },
                    {
                        test: /jquery\.formatCurrency-1\.4\.0\.min/,
                        loader: 'imports?$this=>false'
                    },
                    {
                        test: /AppMeasurement\.js$/,
                        loader: 'expose?s_gi!exports?s_gi',
                    },
                    {
                        test: /oo_engine\.min\.js$/,
                        loader: 'imports?this=>window!exports?OOo',
                    }, {
                        "test": /richrelevance\.p13n\.js/,
                        "loader": "expose?rr_onload_called!expose?RR!expose?rr_placement_place_holders!exports?r3,r3_common,r3_category,r3_item,r3_cart,r3_search,r3_purchased,r3_home,r3_addtocart,r3_error,rr_onload_called,RR,rr_placement_place_holders"
                    },
                    {
                        "test": [
                            /modernizr-2\.8\.2/,
                            /jquery\.ba-bbq/
                        ], "loader": "imports?this=>window"
                    }, {
                        "test": /\.hbs$/,
                        "loader": "handlebars-loader",
                        "query": {
                            "helperDirs": [path.join(wallaby.projectCacheDir, "Assets/Shared/JS/src/helpers")],
                            "debug": false
                        }
                    }
                ],
                "noParse": [
                    /paypalincontextjs-checkout/,
                    /ProgressCircle/,
                    /jquery[\\/]dist[\\/]jquery\.js/,
                    /lodash[\\/]lodash\.js/,
                    /react[\\/]dist[\\/]react/,
                    /babel-polyfill[\\/]dist[\\/]polyfill/,
                    /node_modules[\\/]sinon[\\/]/,
                    /react[\\/]dist[\\/]react-with-addons/
                ]
            }
        }
    );
    return {
        "files": [
            {"pattern": "node_modules/babel/node_modules/babel-core/browser-polyfill.js", "instrument": false},
            {"pattern": "test/fixtures/appData.js", "instrument": false},
            {"pattern": "AssetsExternal/omniture/**/*.js", "load": false, "instrument": true},
            {"pattern": "AssetsExternal/**/*.js", "load": false, "instrument": false},
            {"pattern": "bower_components/**/*.js", "load": false, "instrument": false},
            {"pattern": "test/fixtures/*.js", "load": false}, {"pattern": "Assets/**/*.hbs", "load": false, "instrument": false},
            {"pattern": "Assets/**/*.js", "load": false}, {"pattern": "live-style-guide/specs/**/*.js", "load": false},
            {"pattern": "test/test-helpers/*.js", "load": false}
        ],
        "tests": [{"pattern": "test/code/**/*.js", "load": false}],
        "compilers": {
            'Assets/**/*.js': babelCompiler,
            'AssetsExternal/omniture/**/*.js': babelCompiler,
            'live-style-guide/specs/**/*.js': babelCompiler,
            'test/**/*.js': babelCompiler,
            'test/test-helpers/*.js': babelCompiler,
        },
        "env": {
            //"type": "browser",
            /*runner: require('phantomjs2-ext').path,
            params: {runner: '--web-security=false'},*/
            kind: 'electron',
            runner: path.join(__dirname, '../node_modules/electron-prebuilt/dist/electron.exe'),
            options: {width: 400, height: 400},
        },
        "testFramework": "mocha",
        bootstrap: function (wallaby) {
            window.__moduleBundler.loadTests();
        },
        postprocessor: webpackPostprocessor,
        "reportConsoleErrorAsError": true,
        "debug": true
    }
};