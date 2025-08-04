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
        Schema::create('members', function (Blueprint $table) {
            $table->id();
            $table->string('member_id')->unique()->comment('Auto-generated member ID');
            $table->string('full_name');
            $table->string('employee_id')->unique()->comment('Employee identification number');
            $table->string('company_name');
            $table->string('department');
            $table->string('phone_number');
            $table->string('email')->unique();
            $table->date('membership_start_date');
            $table->date('membership_end_date')->nullable()->comment('Date when member left');
            $table->enum('status', ['active', 'inactive'])->default('active');
            $table->timestamps();
            
            // Indexes for performance
            $table->index('member_id');
            $table->index('employee_id');
            $table->index('company_name');
            $table->index('department');
            $table->index('status');
            $table->index(['status', 'created_at']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('members');
    }
};