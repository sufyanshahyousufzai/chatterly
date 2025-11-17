<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('chat_widget_settings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('company_id')->constrained('companies')->cascadeOnDelete();
            $table->enum('widget_position', ['bottom-right', 'bottom-left', 'top-right', 'top-left'])->default('bottom-right');
            $table->string('primary_color', 7)->default('#E11D48');
            $table->string('online_message')->default('Hi! How can we help?');
            $table->string('offline_message')->default('We are currently offline. Leave a message!');
            $table->text('welcome_message')->nullable();
            $table->boolean('show_company_logo')->default(true);
            $table->boolean('show_agent_photos')->default(true);
            $table->boolean('show_typing_indicator')->default(true);
            $table->boolean('enable_file_upload')->default(true);
            $table->boolean('enable_emoji')->default(true);
            $table->boolean('enable_sound_notifications')->default(true);
            $table->foreignId('pre_chat_form_id')->nullable()->constrained('custom_forms')->nullOnDelete();
            $table->foreignId('offline_form_id')->nullable()->constrained('custom_forms')->nullOnDelete();
            $table->boolean('auto_assign_chats')->default(true);
            $table->timestamps();

            $table->unique('company_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('chat_widget_settings');
    }
};
