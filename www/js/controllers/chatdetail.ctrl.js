(() => {
  'use_strict'
  angular.module('whatsapplike.controllers').controller('ChatDetailCtrl', ChatDetailCtrl)

  function ChatDetailCtrl($scope, $state, $stateParams, ChatsSrv, MessagesSrv, AuthentificationSrv) {
    $scope.user = AuthentificationSrv.user();

    ChatsSrv.get($stateParams.chatId).then(function(chat){
      $scope.chat = chat;
    });

    $scope.$on('$ionicView.enter', function () {
      MessagesSrv.get($stateParams.chatId).then(function(messages){
        $scope.messages = messages;
      });
    });

    $scope.sendMessage = function(sendMessageForm) {
      MessagesSrv.add($scope.chat.id, $scope.user._id, $scope.input.message);
      MessagesSrv.get($stateParams.chatId).then(function(messages){
        $scope.messages = messages;
      });
    }
  }
})();
