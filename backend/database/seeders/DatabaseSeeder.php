<?php

namespace Database\Seeders;

use App\Models\Position;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::factory()->create([
            'name' => 'Admin1',
            'email' => 'admin@example.com',
            'password' => Hash::make("usertest"),


        ]);

        User::factory()->create([
            'name' => 'Employee1',
            'email' => 'employee@example.com',
            'password' => Hash::make("usertest"),
        ]);
    }
}
