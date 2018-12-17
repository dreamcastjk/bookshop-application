<?php


return array(
    'get' => [
        '/home' => 'HomeController@indexAction',
        '/' => 'HomeController@indexAction',
        '/authors' => 'AuthorController@authorListAction',
        '/author/(\d+)' => 'AuthorController@getAuthorAction',
    ],
    'post' => [
        '/book' => 'BookController@createBookAction',
        '/author/(\d+)' => 'AuthorController@updateAuthorAction',
        '/author' => 'AuthorController@addAuthorAction',

    ],
    'delete' => [
        '/author/(\d+)' => 'AuthorController@deleteAuthorAction',
    ]
);

