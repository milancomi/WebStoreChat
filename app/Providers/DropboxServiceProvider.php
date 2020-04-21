<?php

namespace App\Providers;

// use Illuminate\Contracts\Filesystem\Filesystem;
use Illuminate\Support\ServiceProvider;
use League\Flysystem\Filesystem;
use Spatie\Dropbox\Client as DropboxClient;
use Spatie\FlysystemDropbox\DropboxAdapter;
use Storage;





class DropboxServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     *
     * @return void
     */
    public function register()
    {

    }

    /**
     * Bootstrap services.
     *
     * @return void
     */
    public function boot()
    {
        Storage::extend('dropbox', function($app,$config){
            $client = new DropboxClient(
                $config['authorizationToken']
            );
            // curl https://api.dropbox.com/1/account/info -H "Authorization:Bearer N1FZ-12QYHAAAAAAAAAAFUl7D-qbbUW1FwWmKtt1ts15dDa5AUcqkCxhF_sQSLqa"

            // Adapter Strategy / Merge interfaces/ Laracast

            return new Filesystem(new DropboxAdapter($client));
        });
    }
}