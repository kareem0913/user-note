<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    use HasFactory;
    protected $fillable = ['title', 'description', 'long_description', 'completed'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function toggleComplete()
    {
        $this->completed = !$this->completed;
        $this->save();
    }
}
