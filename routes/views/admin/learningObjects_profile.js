var keystone = require('keystone');
var ObjectId = require('mongodb').ObjectId;

exports = module.exports = function(req, res) {
	var view = new keystone.View(req, res);
	var locals = res.locals;

	var pageData = {
		navLinks: [
			{ text: 'Home', link: '/admin' },
			{ text: 'Posts', link: '/admin/posts'},
			{ text: 'Contents', link: '/admin/contents-fiesta'},
			{ text: 'Pages', link: '#'},
			{ text: 'Users', link: '/admin/users'},
			{ text: 'Analytics', link: '/admin/community-views'},
			{ text: 'Community', link: '#'},
			{ text: 'Publications', link: '/admin/publication-settings'},
			{ text: 'Categories', link: '#'},
			{ text: 'ELearning', link: '/admin/learning-objects'}
		],
		breadcrumbs:[
			{ text: 'Learning Objects', link: '/admin/learning-objects'},
			{ text: 'Courses', link: '/admin/courses'},
			{ text: 'Learning Contents', link: '/admin/learning-contents'},
			{ text: 'ISPs', link: '/admin/isps'},
			{ text: 'LIndustries', link: '/admin/lindustries'},
			{ text: 'LSectors', link: '/admin/lsectors'},
			{ text: 'LOFile Uploads', link: '/admin/lofile-uploads'},
			{ text: 'LGalleries', link: '#'},
			{ text: 'LOLinks', link: '#'},
			{ text: 'LOVideos', link: '#'},
			{ text: 'Authors', link: '#'},
			{ text: 'LOComments', link: '#'},
			{ text: 'LOFeedbacks', link: '#'},
			{ text: 'LORatings', link: '#'},
			{ text: 'LOViews', link: '#'},
			{ text: 'Elearning LORating', link: '#'},
			{ text: 'Elearning Visits', link: '#'},
		]
  	};

	//init locals
	locals.section = 'users';
	locals.data = {
		learning_objects: [],
		path:req.path,
	    courses: [],
		learning_contents:[],
        author:[],
	};

	// Load courses
	view.on('init', function (next) {
		var u = keystone.list('Course').model.findOne({_id: req.params.id});

		u.exec(function (err, results) {
			locals.data.courses = results;
			next(err);
		});

	});

	// Load LO
	view.on('init', function (next) {

		var u = keystone.list('LearningObject').model.findOne({_id: req.params.id});
		u.exec(function (err, results) {
			locals.data.learning_objects = results;
			next(err);
		});

	});

	// Load Learning contents
	view.on('init', function (next) {

		var u = keystone.list('LearningContent').model.findOne({_id: req.params.id});

		u.exec(function (err, results) {
			locals.data.learning_contents = results;
			next(err);
		});

	});

    //Load author
    view.on('init', function (next) {
        var id = locals.data.learning_objects.author;
		var u = keystone.list('User').model.findOne({ _id: id });

		u.exec(function (err, results) {
			locals.data.author = results;
            console.log(id)
            console.log(results)
			next(err);
		});

	});


	view.render('admin/learningObjects_profile',pageData);
};
