<?php

namespace App\Jobs;

use App\Mail\RegistrationMail;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Mail;

class SendRegisterMailJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public $user_data;
    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct($user_data)
    {
        $this->user_data = $user_data;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $u_name = $this->user_data['user_name'];
        $u_mail =$this->user_data['user_email'];
        Mail::to($u_mail)
        ->send(new RegistrationMail($u_name));

    }
}
