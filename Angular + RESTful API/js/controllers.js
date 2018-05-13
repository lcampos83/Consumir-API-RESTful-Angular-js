angular.module("FinalApp")
	.controller("MainController",function($scope,$resource, PostResource){

		/*OJO EL API RESTFUL UTILIZADO ES SOLO PARA PRUEBAS USA LOS METODOS DE PUSH, UDATE PERO NO MODICA NADA EN LA DB*/
 
		User = $resource("https://jsonplaceholder.typicode.com/users/:id",{id: "@id"});

		/*almacena la consulta, el retorno es un array*/
		$scope.posts = PostResource.query();
		$scope.users = User.query();

		/*Funcion para eliminar un post*/
		$scope.removePost = function(post){
			PostResource.delete({id: post.id}, function(data){
				console.log(data);
				//$scope.posts = Post.query(); 
			});
			//recoore el array y devuel el array sin el elemento eliminado
			$scope.posts = $scope.posts.filter(function(element){
				return element.id !== post.id;
			});
		}
})

	.controller("PostController", function($scope, PostResource, $routeParams, $location){
		$scope.title = "Editar Post";
		$scope.post = PostResource.get({id: $routeParams.id});
		$scope.savePost = function(){
			PostResource.update({id: $scope.post.id},{data: $scope.post}, function(data){
				console.log(data);
				$location.path("/post/" + $scope.post.id);
			});
		}
	})

	.controller("NewPostController", function($scope, PostResource, $location){

		$scope.post = {};
		$scope.title = "Crear Post";
		$scope.savePost = function(){
			PostResource.save({data: $scope.post}, function(data){
				console.log(data);
				$location.path("/");
			});
		}
});