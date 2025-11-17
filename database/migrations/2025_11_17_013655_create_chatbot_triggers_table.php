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
        Schema::create('chatbot_triggers', function (Blueprint $table) {
            $table->id();
            $table->foreignId('company_id')->constrained('companies')->cascadeOnDelete();
            $table->string('name');
            $table->enum('trigger_type', ['keyword', 'url', 'time_on_site', 'page_visit_count', 'greeting'])->default('keyword');
            $table->json('keywords')->nullable(); // ["help", "support", "pricing"]
            $table->string('url_pattern')->nullable(); // e.g., /pricing
            $table->integer('time_seconds')->nullable(); // Trigger after X seconds
            $table->integer('page_visit_count')->nullable();
            $table->enum('response_type', ['text', 'quick_replies', 'form', 'transfer_to_agent'])->default('text');
            $table->text('response_message')->nullable();
            $table->json('quick_replies')->nullable(); // ["Talk to agent", "Browse FAQ", "Leave message"]
            $table->boolean('is_active')->default(true);
            $table->integer('sort_order')->default(0);
            $table->timestamps();

            $table->index('company_id');
            $table->index('trigger_type');
            $table->index('is_active');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('chatbot_triggers');
    }
};
