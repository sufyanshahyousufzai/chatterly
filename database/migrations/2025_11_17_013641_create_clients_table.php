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
        Schema::create('clients', function (Blueprint $table) {
            $table->id();
            $table->foreignId('company_id')->constrained('companies')->cascadeOnDelete();
            $table->string('client_id', 50); // CLI001 per company
            $table->string('name');
            $table->string('email');
            $table->string('password')->nullable(); // For portal access
            $table->string('phone', 50)->nullable();
            $table->string('avatar')->nullable();
            $table->string('company_name')->nullable();
            $table->text('address')->nullable();
            $table->string('city', 100)->nullable();
            $table->string('state', 100)->nullable();
            $table->string('country', 100)->nullable();
            $table->string('postal_code', 20)->nullable();
            $table->text('notes')->nullable();
            $table->json('tags')->nullable();
            $table->boolean('portal_access')->default(false);
            $table->boolean('is_active')->default(true);
            $table->timestamp('last_login_at')->nullable();
            $table->rememberToken();
            $table->unsignedBigInteger('created_by'); // staff.id or company_users.id
            $table->timestamps();

            $table->unique(['company_id', 'email']);
            $table->unique(['company_id', 'client_id']);
            $table->index('company_id');
            $table->index('portal_access');
            $table->index('is_active');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('clients');
    }
};
