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
        Schema::create('chat_analytics', function (Blueprint $table) {
            $table->id();
            $table->foreignId('company_id')->constrained('companies')->cascadeOnDelete();
            $table->date('date');
            $table->integer('total_chats')->default(0);
            $table->integer('missed_chats')->default(0);
            $table->integer('completed_chats')->default(0);
            $table->integer('avg_wait_time')->default(0); // Seconds
            $table->integer('avg_chat_duration')->default(0); // Seconds
            $table->decimal('avg_messages_per_chat', 5, 2)->default(0);
            $table->decimal('satisfaction_rating', 3, 2)->nullable();
            $table->timestamps();

            $table->unique(['company_id', 'date']);
            $table->index('company_id');
            $table->index('date');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('chat_analytics');
    }
};
