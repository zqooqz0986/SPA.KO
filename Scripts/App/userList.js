define(['jquery', 'knockout', "text!Views/UserList.html", "knockout.mapping", "jquery.localize"], function($, ko, htmlString) {
    function UserListViewModel(route) {

        $("[data-localize]").localize("userList", { language: "zh-TW", pathPrefix: "../../Localization", skipLanguage: "en-US" });

        var self = this;

        self.users = getUsers();

        self.newName = ko.observable('');
        self.newAge = ko.observable(0);

        self.save = function() {
            var id = Math.floor((Math.random() * 10) + 1);
            var newone = createUser(id, self.newName(), self.newAge());
            var ob = ko.mapping.fromJS(newone);
            self.users.push(ob);
        };

        self.remove = function() {
            self.users.remove(this);
        };

        self.select = function(user) {
            location.hash = 'info/' + user.id();
        }

        self.goStockTicker = function() {
            location.hash = 'stock-ticker/';
        }

        self.addYear = function() {
            for (var index = 0; index < self.users().length; index++) {
                var user = self.users()[index];

                var age = user.age();
                user.age(age + 1);
            }
        }

    }

    function getUsers() {
        var users = [createUser(1, "Lu", 20), createUser(2, "Gigi", 24), createUser(3, "May", 40)];


        var obs = ko.mapping.fromJS(users);

        return obs;
    }

    function createUser(id, name, age) {
        return { id: id, name: name, age: age };
    }

    return { viewModel: UserListViewModel, template: htmlString };
});