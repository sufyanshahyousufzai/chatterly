<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ChatWidgetSettings extends Model
{
    use HasFactory;

    protected $fillable = [
        'company_id', 'widget_position', 'primary_color', 'online_message', 'offline_message',
        'welcome_message', 'show_company_logo', 'show_agent_photos', 'show_typing_indicator',
        'enable_file_upload', 'enable_emoji', 'enable_sound_notifications',
        'pre_chat_form_id', 'offline_form_id', 'auto_assign_chats',
    ];

    protected function casts(): array
    {
        return [
            'show_company_logo' => 'boolean',
            'show_agent_photos' => 'boolean',
            'show_typing_indicator' => 'boolean',
            'enable_file_upload' => 'boolean',
            'enable_emoji' => 'boolean',
            'enable_sound_notifications' => 'boolean',
            'auto_assign_chats' => 'boolean',
        ];
    }

    public function company(): BelongsTo { return $this->belongsTo(Company::class); }
    public function preChatForm(): BelongsTo { return $this->belongsTo(CustomForm::class, 'pre_chat_form_id'); }
    public function offlineForm(): BelongsTo { return $this->belongsTo(CustomForm::class, 'offline_form_id'); }
}