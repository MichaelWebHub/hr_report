function classHrReport() {
    var that_ = this;

    this.initHrReport = function () {

        var path = $("head").find("link").last().attr("href").split("/");
        path[path.length - 1] = "";
        this.path = path.join("/");

        this.refresh();
        var globalSettings = this.globalSettings;
        //============================================================
        //создание html страницы
        //============================================================
        var component = '#' + globalSettings.teg + '_COMPONENT ';
        var html =
            '<div id="hr-app" ng-app="hrApp">' +
            '   <main id="id_main" class="hr-main">' +
            '       <ui-view class="main-view"></ui-view>' +
            '   </main>' +
            '</div>';


        $(component).append(html);

        angular.module('hrApp', ["ui.router"]);

        //============================================================
        //роутер
        //============================================================
        angular.module('hrApp').config(["$stateProvider", function ($stateProvider) {
            $stateProvider
                .state('index', {
                    url: '/index',
                    template: '<menu-component></menu-component>'
                })
        }]);

        angular.module('hrApp').run(['$state', function ($state) {
            $state.go("index");
        }]);


        // View - Controller
        angular.module('hrApp').component('menuComponent', {
            templateUrl: that_.path + "modules/menuComponent/menuView.html",
            controller: menuController
        });
        

        // Init angular hrApp

        angular.element(function () {
            angular.bootstrap(document.getElementById("hr-app"), ['hrApp']);
        });
    }
}
