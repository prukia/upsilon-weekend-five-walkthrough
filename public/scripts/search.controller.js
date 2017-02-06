angular.module("gifApp").controller("SearchController", [
  "GiphyService",
  function(GiphyService) {
    console.log("loaded gif controller");

    var vm = this;

    this.random = function() {
      GiphyService.random().then(function(gif) {
        vm.results = [];
        vm.results.push({ url: gif.image_url });
      });
    };

    this.search = function() {
      GiphyService.search(vm.q).then(function(gifs) {
        //map function will apply a transformation on each item of array
        //for each element inside the list create a prop called urls
        vm.results = gifs.map(function(gif) {
          return { url: gif.images.fixed_height.url };
        });
        console.log(vm.results);
      });
    };
  }
]);
