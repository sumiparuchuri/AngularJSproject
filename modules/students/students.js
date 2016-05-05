'use strict';

angular.module('myApp.students', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/students', {
    templateUrl: 'modules/students/search.html',
    controller: 'ViewStudentsSearchCtrl'
  })
    .when('/students/create', {
    templateUrl: 'modules/students/create.html',
    controller: 'ViewStudentsCreateCtrl'
  })
    .when('/students/create/images/:id', {
    templateUrl: 'modules/students/images.html',
    controller: 'ViewStudentsImagesCtrl'
  })
  //route for search and browse
  .when('/students/search', {
    templateUrl: 'modules/students/search.html',
    controller: 'ViewStudentsSearchCtrl'
  })
   //search and browse
  
  // '/students/search'
  // '/students/search/0'
  // '/students/search/0/keyword'
  // '/students/search/0/lat/lng/radius'
  // '/students/search/0/keyword/lat/lng/radius'
  
  .when('/students/search/:page/:keyword/:lat/:lng/:radius/:location', {
    templateUrl: 'modules/students/search.html',
    controller: 'ViewStudentsSearchCtrl'
  })
  
  
  .when('/students/search/:page/:lat/:lng/:radius/:location', {
    templateUrl: 'modules/students/search.html',
    controller: 'ViewStudentsSearchCtrl'
  })
  
  
  .when('/students/search/:page/:keyword', {
    templateUrl: 'modules/students/search.html',
    controller: 'ViewStudentsSearchCtrl'
  })
  
  .when('/students/search/:page', {
    templateUrl: 'modules/students/search.html',
    controller: 'ViewStudentsSearchCtrl'
  })
  
  .when('/students/search', {
    templateUrl: 'modules/students/search.html',
    controller: 'ViewStudentsSearchCtrl'
  })
  
  .when('/students/detail/:id', {
    templateUrl: 'modules/students/detail.html',
    controller: 'ViewStudentsDetailCtrl'
  })
  
  //my profile route
  .when('/students/my/:page', {
    templateUrl: 'modules/students/my.html',
    controller: 'ViewStudentsMyProfileCtrl'
  })
  .when('/students/my', {
    templateUrl: 'modules/students/my.html',
    controller: 'ViewStudentsMyProfileCtrl'
  })
  
;
}])

.controller('ViewStudentsDetailCtrl', ['$scope', '$location', 'dataService', '$routeParams', function($scope, $location, dataService, $routeParams) {

 $scope.results = {};
  
  $scope.setImage = function(image) {
    $scope.results.mainImage = image;
  };
            
    
    function getSuccess(response) {
    $scope.results = response.data.data;
    
    var images = $scope.results.detailsFull.images;
    if (images) {
      angular.forEach(images, function(value1, key1) {
        if (!$scope.results.mainImage) {
          $scope.results.mainImage = value1;
        }//end if
      });//end foreach
    }//end if
    
    if (!$scope.results.mainImage) {
      $scope.results.mainImage = 'images/noimage.jpg';
    }//end if
    console.log($scope.results);
  }
  
  function getFailure(response) {
    console.log('failed: ', response);
  }
  
  var url = 'http://bootstrap.mkgalaxy.com/svnprojects/horo/records.php?action=getOne&id='+$routeParams.id;
  dataService.get(url, getSuccess, getFailure, true);                 
  
}])

// controller for my profile
.controller('ViewStudentsMyProfileCtrl', ['$scope', '$location', 'dataService', '$routeParams', function($scope, $location, dataService, $routeParams) {
  
  

  
  $scope.frm = {};
  
  
  $scope.frm.urlPrefix = '#/students/my';
  $scope.frm.urlSufix = '';
  
  
  //initialize the value of page, i.e. default value
  $scope.frm.page = 0;
  
  //page from url, if something coming from url, i will use that
  if ($routeParams.page) {
    $scope.frm.page = $routeParams.page;
  }
  //page
  
  $scope.results = null;
  
  
  function successGetData(response) {
    console.log('success: ', response);
    $scope.results = response.data.data.results;
    
    //create the mainImage
    angular.forEach($scope.results, function(value, key) {
      var images = value.detailsFull.images;
      if (images) {
        angular.forEach(images, function(value1, key1) {
          if (!$scope.results[key].mainImage) {
            $scope.results[key].mainImage = value1;
          }//end if
        });//end foreach
      }//end if
      
      if (!$scope.results[key].mainImage) {
        $scope.results[key].mainImage = 'images/noimage.jpg';
      }//end if
    });//end foreach
    //image ends
    
    $scope.data = response.data.data;
  }
  
  function failureGetData(response) {
    console.log('failed: ', response);
  }
  
  $scope.getData = function() {
    var url = 'http://bootstrap.mkgalaxy.com/svnprojects/horo/records.php?action=my&showLocation=1&path=/aruna/students&max=12&noCache=1';
    
    
    url = url + '&page=' + $scope.frm.page;
    
    var access_token = $scope.loggedInUsersData.token;
    url = url + '&access_token='+access_token;
    dataService.get(url, successGetData, failureGetData, false);
  };//get data ends
  
  $scope.getData();//get data on page load
}])


//controller for search and browse
.controller('ViewStudentsSearchCtrl', ['$scope','dataService','$location','$routeParams',function($scope,dataService,$location,$routeParams) {
 
    //location starts
  $scope.mapOptions = {
    types: 'geocode'
  };

  $scope.details = {};
  $scope.details.components = {};
  //location ends             
                
  //console.log('route param is ', $routeParams);
  $scope.frm = {};
  
  $scope.frm.urlPrefix = '#/students/search';
  $scope.frm.urlSufix = '';
  
   //initialize the value of page, i.e. default value
  $scope.frm.page = 0;
  
  //page from url, if something coming from url, i will use that
  if ($routeParams.page) {
    $scope.frm.page = $routeParams.page;
  }
  //page
  
  //default keyword
  $scope.frm.keyword = '';
  
  //check if url has keyword
  if ($routeParams.keyword) {
    $scope.frm.keyword = decodeURIComponent($routeParams.keyword);
    
    $scope.frm.urlSufix = $scope.frm.urlSufix + '/' + $routeParams.keyword;
  }
  
  
  $scope.frm.radius = 30;
  
    if ($routeParams.lat) {
    $scope.details.components.lat = $routeParams.lat;
    $scope.frm.urlSufix = $scope.frm.urlSufix + '/' + $routeParams.lat;
  }
  
  if ($routeParams.lng) {
    $scope.details.components.lng = $routeParams.lng;
    $scope.frm.urlSufix = $scope.frm.urlSufix + '/' + $routeParams.lng;
  }
 
  if ($routeParams.radius) {
     $scope.frm.radius = $routeParams.radius;
    $scope.frm.urlSufix = $scope.frm.urlSufix + '/' + $routeParams.radius;
  }
  
  if ($routeParams.location) {
    $scope.location = decodeURIComponent($routeParams.location);
    
    $scope.frm.urlSufix = $scope.frm.urlSufix + '/' + $routeParams.location;
  }
 
  $scope.results = null;
  
  
  function successGetData(response) {
    console.log('success: ', response.data.data.results);
    $scope.results = response.data.data.results;
    
    //create the mainImage
    angular.forEach($scope.results, function(value, key) {
      var images = value.detailsFull.images;
      if (images) {
        angular.forEach(images, function(value1, key1) {
          if (!$scope.results[key].mainImage) {
           $scope.results[key].mainImage = value1;
          }
        });
      }
      
      if (!$scope.results[key].mainImage) {
        $scope.results[key].mainImage = 'images/noimage.jpg';
      }
    });
    
    console.log($scope.results);
    
     $scope.data = response.data.data;
  }
  
  function failureGetData(response) {
    console.log('failed: ', response);
  }
  
  
  $scope.getData = function() {
      
      var url = 'http://bootstrap.mkgalaxy.com/svnprojects/horo/records.php?action=getAll&showLocation=1&path=/aruna/students&max=2';
    //check the keyword
    if ($scope.frm.keyword) {
      url = url + '&q=' + encodeURIComponent($scope.frm.keyword); 
    }
    
    //check the location
    if ($scope.location) {
      url = url + '&lat='+$scope.details.components.lat+'&lon='+$scope.details.components.lng+'&r='+encodeURIComponent($scope.frm.radius);
    }
     url = url + '&page=' + $scope.frm.page;
    console.log(url);
    dataService.get(url, successGetData, failureGetData, true);//true is for cache
    
  };//get data ends
  
  $scope.getData();//get data on page load
  
  /*Purpose of construct url is to create the url and pass the user to that url, it does not do any backend work. it just do client side redirection. url is contructed based on the route which we created.*/
  
  $scope.constructURL = function() {
    var url = '/students/search/0';
    
    if ($scope.frm.keyword) {
      url = url + '/' + encodeURIComponent($scope.frm.keyword);
    }
    
    if ($scope.location) {
      if (!$scope.frm.radius) {
        $scope.frm.radius = 30;
      }
      
      url = url + '/' + $scope.details.components.lat + '/' + $scope.details.components.lng + '/' + encodeURIComponent($scope.frm.radius) + '/' + encodeURIComponent($scope.location);
    }
    // to send user to url
    $location.path(url);
  };
  
}])

.controller('ViewStudentsCtrl', ['$scope',function($scope) {

}])

.controller('ViewStudentsCreateCtrl', ['$scope','$location','dataService', function($scope,$location,dataService) {
   //location starts
  $scope.mapOptions = {
    types: 'geocode'
  };

  $scope.details = {};
 
  //location ends
  
  function addSuccess(response) {
    console.log('success: ', response);
    console.log('id is : ', response.data.data.id);
    $scope.frm = {};
    $location.path('/students/create/images/'+response.data.data.id);
    console.log(response.data.data.id);
  }
  
  function addFailure(response) {
    console.log('failure: ', response);
  }
  
   $scope.submitCreateForm = function() {
     //call api service to submit the form
     
    // $location.path('/students/create/images/1');
     // console.log($scope.loggedInUsersData);
     //console.log($scope.frm);
     //console.log($scope.details);
     
     
     var url = 'http://bootstrap.mkgalaxy.com/svnprojects/horo/records.php?action=add&saveIP=1&access_token='+$scope.loggedInUsersData.token+'&path=/aruna/students&tid=1';
     
     console.log(url);
     
    
    var postData = '';
    postData = postData + '&title='+encodeURIComponent($scope.frm.title);
    postData = postData + '&description='+encodeURIComponent($scope.frm.description);
    
    postData = postData + '&location[latitude]='+encodeURIComponent($scope.details.components.lat);
    postData = postData + '&location[longitude]='+encodeURIComponent($scope.details.components.lng);
    postData = postData + '&location[country]='+encodeURIComponent($scope.details.components.country);
    postData = postData + '&location[state]='+encodeURIComponent($scope.details.components.state);
    postData = postData + '&location[city]='+encodeURIComponent($scope.details.components.city);
    postData = postData + '&location[zip]='+encodeURIComponent($scope.details.components.postal_code);
    postData = postData + '&location[place_id]='+encodeURIComponent($scope.details.place_id);
    postData = postData + '&location[county]='+encodeURIComponent($scope.details.components.county);
    postData = postData + '&location[formatted_addr]='+encodeURIComponent($scope.details.formatted_address);
    
    postData = postData + '&tags='+encodeURIComponent($scope.frm.tags);
    
    postData = postData + '&classstudying='+encodeURIComponent($scope.frm.classstudying);
    postData = postData + '&age='+encodeURIComponent($scope.frm.age);
    postData = postData + '&email='+encodeURIComponent($scope.frm.email);
    postData = postData + '&phone='+$scope.frm.phone;
    
    postData = postData + '&data[gender]='+encodeURIComponent($scope.frm.gender);
    
    console.log(postData);
    dataService.post(url, postData, addSuccess, addFailure);
  };
}])

.controller('ViewStudentsImagesCtrl', ['$scope', '$location', 'dataService', '$routeParams', function($scope, $location, dataService, $routeParams) {
  
  $scope.id = $routeParams.id;
 
  
  //get Data part
  $scope.images = null;
  function successGetData(response) {
    console.log('success: ', response);
    
    $scope.images = response.data.data.detailsFull.images;
  }
  
  function failureGetData(response) {
    console.log('failed: ', response);
  }
  
  $scope.getData = function() {
    var url = 'http://bootstrap.mkgalaxy.com/svnprojects/horo/records.php?action=getOne&noCache=1&id='+$routeParams.id;
    dataService.get(url, successGetData, failureGetData, false);
  };
  
  //call the getdata function
  $scope.getData();
   //end getData part
  
  
  
  //add Image in database
        
  $scope.frm = {};
  
  function addImageSuccess(response) {
    console.log('success: ', response);
    $scope.frm = {};
    
     $scope.getData();
  }
  
  function addImageFailure(response) {
    console.log('failed: ', response);
  }
  
  
  $scope.addImage = function() {
    console.log($scope.frm);
    var url = 'http://bootstrap.mkgalaxy.com/svnprojects/horo/records.php?action=updateSingle&access_token='+$scope.loggedInUsersData.token+'&key=images&id='+$routeParams.id;
    var postData = '';
    postData = postData + '&param='+encodeURIComponent($scope.frm.image);
    
    console.log(url);
    console.log(postData);  
    
    dataService.post(url, postData, addImageSuccess, addImageFailure);

  }; //add image function ends
  //ends add Image in database
  
  
  
  
 
}])

;