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
        Schema::create('visitors', function (Blueprint $table) {
            $table->id();
            $table->foreignId('company_id')->constrained('companies')->cascadeOnDelete();
            $table->uuid('visitor_uuid')->unique();
            $table->string('name')->nullable(); // From pre-chat form
            $table->string('email')->nullable();
            $table->string('phone', 50)->nullable();
            $table->string('ip_address', 45);
            $table->string('country', 100)->nullable();
            $table->string('city', 100)->nullable();
            $table->string('device', 100)->nullable(); // Desktop, Mobile, Tablet
            $table->string('browser', 100)->nullable();
            $table->string('os', 100)->nullable();
            $table->string('current_page', 500)->nullable();
            $table->string('referrer', 500)->nullable();
            $table->boolean('is_chatting')->default(false);
            $table->boolean('is_online')->default(true);
            $table->timestamp('last_seen_at');
            $table->timestamps();

            $table->index('company_id');
            $table->index('visitor_uuid');
            $table->index('is_online');
            $table->index('is_chatting');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('visitors');
    }
};
