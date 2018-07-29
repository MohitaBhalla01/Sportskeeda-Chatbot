var addBanner = angular.module('addBanner', ["ngSanitize"]);
var session = {};
addBanner.directive('ngEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if(event.which === 13) {
                scope.$apply(function (){
                    scope.$eval(attrs.ngEnter);
                });

                event.preventDefault();
            }
        });
    };
});
addBanner.controller("addBannerController", function ($scope, $http, $window) {
    $scope.showWana = true;
        $scope.textwan = true;

    $scope.openApp = function () {
        $window.location.href = "http://dev.arrowai.com/webchat/run.php?appId=5a9a3c249eedfa89008b456a&open=yes" + "&arrow_group_id=" + $window.sessionStorage.getItem("groupId") + "" + "&arrow_conversation=5a9a42f79eedfa89008b456e"
    }
    $scope.page_load = function () {
        if (!$window.sessionStorage || $window.sessionStorage.getItem("userid") == undefined) {
            $scope.create_user();
            // $scope.create_user_second();
        } else {
            session['userid'] = $window.sessionStorage.getItem("userid");
            session['groupId'] = $window.sessionStorage.getItem("groupId");
            session['userid1'] = $window.sessionStorage.getItem("userid1");
            session['groupId1'] = $window.sessionStorage.getItem("groupId1");
           // $scope.firstMessage();
        }
    }

    function getUserClientInfo() {
        window.onerror = null;
        var obj = {};
        obj.userInfo = obj.userInfo || {};
        colors = window.screen.colorDepth;
        obj.userInfo.color = Math.pow(2, colors);
        if (window.screen.fontSmoothingEnabled == true)
            obj.userInfo.fonts = "Yes";
        else obj.userInfo.fonts = "No";

        obj.userInfo.navigator = navigator.appName;
        obj.userInfo.channel = "web";
        obj.userInfo.webUserGuest = false;
        obj.userInfo.version = navigator.appVersion;
        obj.userInfo.colordepth = window.screen.colorDepth;
        obj.userInfo.width = window.screen.width;
        obj.userInfo.height = window.screen.height;
        obj.userInfo.maxwidth = window.screen.availWidth;
        obj.userInfo.maxheight = window.screen.availHeight;
        obj.userInfo.codename = navigator.appCodeName;
        obj.userInfo.platform = navigator.platform;
        if (navigator.javaEnabled() < 1) obj.userInfo.java = "No";
        if (navigator.javaEnabled() == 1) obj.userInfo.java = "Yes";

        if (navigator.javaEnabled() && (navigator.appName != "Microsoft Internet Explorer" && navigator.appName != 'Netscape')) {
            vartool = java.awt.Toolkit.getDefaultToolkit();
            addr = java.net.InetAddress.getLocalHost();
            host = addr.getHostName();
            ip = addr.getHostAddress();
            alert("Your host name is '" + host + "'\nYour IP address is " + ip);
        }
        return obj.userInfo;
    }

    $scope.create_user = function () {
        $scope.recommendations = '';
        $scope.message = '';
        $scope.suggestion_chip='';
          $scope.url='';
        $scope.types ='';
        $scope.suggestion = [];
        $scope.link_suggestion = [];
        $http({
            crossDomain: true,
            dataType: 'jsonp',
            //, "endExistingFlow": true 
            method: 'POST',
            url: 'https://firedev.arrowai.com/users/new',

            data: {
                "data": {
                    "appId": "5a9a3c249eedfa89008b456a",
                    "name": "BannerGuest" + Math.floor(Math.random() * 1000),
                    "source": ["web"]
                },
                "deviceInfo": getUserClientInfo(),
                "applicationId": "5ab63967eafb3089008b456a",
                "channel": "web"
            }

            ,
            headers: {'Content-Type': 'application/json; charset=utf-8'},
        })
            .success(function (data) {
                if($window.sessionStorage) {
                    $window.sessionStorage.setItem("userid", data.id);
                    $window.sessionStorage.setItem("groupId", data.groupId);
                }
                session['userid'] = data.id;
                session['groupId'] = data.groupId;
                $scope.firstMessage();
                $scope.create_user_second(data.groupId);
            })
            .error(function (data, status, headers, config) {

            });
    }
    $scope.create_user_second = function (groupId) {
        $scope.recommendations = '';
        $scope.message = '';
          $scope.url='';
        $scope.suggestion = [];
        $scope.link_suggestion = [];
        $scope.types ='';
                $scope.suggestion_chip='';

        $http({
            crossDomain: true,
            dataType: 'jsonp',
            //, "endExistingFlow": true 
            method: 'POST',
            url: 'https://firedev.arrowai.com/users/new',

            data: {
                "data": {
                    "appId": "5a9a3c249eedfa89008b456a",
                    "name": "BannerGuest" + Math.floor(Math.random() * 1000),
                    "source": ["web"]
                },
                "groupId": groupId,
                "deviceInfo": getUserClientInfo(),
                "applicationId": "5ab63967eafb3089008b456a",
                "channel": "web"
            }

            ,
            headers: {'Content-Type': 'application/json; charset=utf-8'},
        })
            .success(function (data) {
                if($window.sessionStorage) {
                    $window.sessionStorage.setItem("userid1", data.id);
                    $window.sessionStorage.setItem("groupId1", data.groupId);
                }
                session['userid1'] = data.id;
                session['groupId1'] = data.groupId;
                $scope.firstMessage();

            })
            .error(function (data, status, headers, config) {

            });
    }
    $scope.userMsg = '';
    $scope.res = 1;



    $scope.getReply = function (value) {
       if (value === '' || value === undefined) {
            $scope.fordStyle = {
                'border-color': 'red'
            }
            return false;
        }
        $scope.fordStyle = {}
        $scope.showWana = false;
        $scope.userMsg = value;
        $scope.recommendations = '';
        $scope.message = '';
        $scope.types ='';
        $scope.ResponseData = [];
        $scope.suggestion = [];
         $scope.link_suggestion = [];
                $scope.suggestion_chip='';
               $scope.url='';

        $scope.Object1 = '';
        $scope.Object2 = '';
        $http({
            crossDomain: true,
            dataType: 'jsonp',
            //, "endExistingFlow": true
            method: 'GET',
            url: 'https://api.dialogflow.com/v1/query?v=20150910&lang=en&query='+value+'&contexts=&sessionId=hello1234preeti&timezone=America/New_York',


            headers: { 
             'Authorization': 'Bearer 88a13677c394491383c0c09b6e43a0a8'},

 })

 // 1f1ef80dfc9444a0956312199086e15b
 // 88c93a2ee4eb46eb882d4c9e3e153b85



            .success(function (body) {

            console.log('result of data hello' +JSON.stringify(body));

             //console.log('Result title '+body.result.fulfillment.messages[1].suggestions[1].title);
                     // $scope.search = '';

      //$scope.message = $scope.body.result.fulfillment.messages[1].suggestions[1].title;


      $scope.search = '';
                
                $scope.ResponseData = body.result.fulfillment.messages;

                if($scope.ResponseData.length>2){
                    $scope.textwan = false;
                    $scope.message = body.result.fulfillment.messages[0].textToSpeech;
                    $scope.types = body.result.fulfillment.messages[1].type;
                    console.log($scope.types);
                    if($scope.types==='suggestion_chips')
                    {
                                          $scope.suggestion = body.result.fulfillment.messages[1].suggestions;

   
                    }
 if($scope.types==='link_out_chip')

{


    console.log($scope.types);
               $scope.suggestion_chip = body.result.fulfillment.messages[1].destinationName;
               $scope.url=body.result.fulfillment.messages[1].url;
               var obj ={};
               obj.title = $scope.suggestion_chip;
               obj.url = $scope.url;
               var array = [];
               array.push(obj);
               $scope.link_suggestion =array;
  console.log(array);
}


            }
            else{

                $scope.message = body.result.fulfillment.messages[0].textToSpeech;


            }
                
            })
            .error(function (body, status, headers, config) {
            
console.log(body);
            });
    }






// suggestion link out

$scope.redirect = function (value) {
    
       if (value === '' || value === undefined) {
            $scope.fordStyle = {
                'border-color': 'red'
            }
            return false;
        }
        window.location=value;
    }






     });   
