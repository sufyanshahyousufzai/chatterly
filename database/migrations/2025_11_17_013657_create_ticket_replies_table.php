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
        Schema::create('ticket_replies', function (Blueprint $table) {
            $table->id();
            $table->foreignId('ticket_id')->constrained('tickets')->cascadeOnDelete();
            $table->string('sender_type', 100); // App\Models\Staff, App\Models\Client
            $table->unsignedBigInteger('sender_id');
            $table->text('message');
            $table->boolean('is_internal')->default(false); // Internal notes
            $table->json('attachments')->nullable();
            $table->timestamps();

            $table->index('ticket_id');
            $table->index(['sender_type', 'sender_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ticket_replies');
    }
};
