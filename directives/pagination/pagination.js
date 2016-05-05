(function() {
  var moduleName = 'paginationModule';
  var module;
  try {
      module = angular.module(moduleName);
  } catch(err) {
      // named module does not exist, so create one
      module = angular.module(moduleName, []);
  }
  
  module
    .directive('pagination', pagination);
    

  function pagination() {
    return {
          scope: {
            maxRows: '@',
            pageNum: '@',
            startRows: '@',
            totalPages: '@',
            totalRows: '@',
            urlPrefix: '@',
            urlSuffix: '@'
          },
          templateUrl: 'directives/pagination/pagination.html',
          link: function(scope, elem, attrs) {
            //min rows
            scope.$watch('startRows', function (newValue, oldValue) {
              scope.maxRows = parseInt(scope.maxRows);
              scope.pageNum = parseInt(scope.pageNum);
              scope.startRows = parseInt(scope.startRows);
              scope.totalPages = parseInt(scope.totalPages);
              scope.totalRows = parseInt(scope.totalRows);
              
              
              scope.startRowsPlus = scope.startRows + 1;
              scope.minRows = scope.totalRows;
              if ((scope.startRows + scope.maxRows) < scope.totalRows) {
                scope.minRows = (scope.startRows + scope.maxRows);
              }
              
              scope.prevPage = scope.pageNum - 1;
              if ((scope.pageNum - 1) < 0) {
                scope.prevPage = 0;
              }
              //min($totalPages_rsView, $pageNum_rsView + 1)
              
              scope.nextPage = (scope.pageNum + 1);
              if (scope.totalPages < (scope.pageNum + 1)) {
                scope.nextPage = scope.totalPages;
              }
              
              
            });
            //min rows end
            
          }//end link
    };//end return
  }//end function pagination()

}());