define(['knockout', 'text!Views/UserInfo.html', "knockout.mapping"], function(ko, htmlString) {

    function UserInfoViewModel(route) {
        var self = this;

        var user = getUserInfo(route.id);

        self.userInfo = user;

        self.goHome = function() {
            location.hash = '';
        };

    }
    function getUserInfo(id) {
        var user = {};
        switch (+id) {
            case 1:
                user.name = "cool";
                user.age = 12;
                break;
            case 2:
                user.name = "cool2";
                user.age = 22;
                break;
            default:
                return undefined;
        }

        var ob = ko.mapping.fromJS(user);

        return ob;
    }
    return { viewModel: UserInfoViewModel, template: htmlString };
});

