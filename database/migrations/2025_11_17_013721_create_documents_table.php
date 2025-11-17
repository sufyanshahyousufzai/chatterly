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
        Schema::create('documents', function (Blueprint $table) {
            $table->id();
            $table->foreignId('company_id')->constrained('companies')->cascadeOnDelete();
            $table->string('document_name');
            $table->string('category')->nullable();
            $table->string('file_path');
            $table->string('file_type', 50);
            $table->integer('file_size');
            $table->string('document_for_type', 100); // App\Models\Client, App\Models\Staff
            $table->unsignedBigInteger('document_for_id');
            $table->date('expiry_date')->nullable();
            $table->integer('reminder_days')->default(0);
            $table->unsignedBigInteger('uploaded_by');
            $table->timestamps();

            $table->index('company_id');
            $table->index(['document_for_type', 'document_for_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('documents');
    }
};
