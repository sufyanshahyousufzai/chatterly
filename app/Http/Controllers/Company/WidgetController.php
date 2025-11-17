<?php

namespace App\Http\Controllers\Company;

use App\Http\Controllers\Controller;
use App\Models\ChatWidgetSetting;
use App\Models\CustomForm;
use Illuminate\Http\Request;
use Inertia\Inertia;

class WidgetController extends Controller
{
    public function index()
    {
        $company = auth()->guard('company')->user()->company;

        // Get or create widget settings
        $settings = ChatWidgetSetting::firstOrCreate(
            ['company_id' => $company->id],
            [
                'widget_position' => 'bottom-right',
                'primary_color' => '#E11D48',
                'online_message' => 'Hi! How can we help?',
                'offline_message' => 'We are currently offline. Leave a message!',
                'welcome_message' => null,
                'show_company_logo' => true,
                'show_agent_photos' => true,
                'show_typing_indicator' => true,
                'enable_file_upload' => true,
                'enable_emoji' => true,
                'enable_sound_notifications' => true,
                'auto_assign_chats' => true,
            ]
        );

        // Get available custom forms
        $preChatForms = CustomForm::where('company_id', $company->id)
            ->where('form_type', 'pre_chat')
            ->where('is_active', true)
            ->get();

        $offlineForms = CustomForm::where('company_id', $company->id)
            ->where('form_type', 'offline')
            ->where('is_active', true)
            ->get();

        // Generate widget embed code
        $widgetCode = $this->generateEmbedCode($company->uuid);

        return Inertia::render('company/WidgetSettings', [
            'settings' => $settings,
            'preChatForms' => $preChatForms,
            'offlineForms' => $offlineForms,
            'widgetCode' => $widgetCode,
            'company' => $company,
        ]);
    }

    public function update(Request $request)
    {
        $request->validate([
            'widget_position' => 'required|in:bottom-right,bottom-left,top-right,top-left',
            'primary_color' => 'required|regex:/^#[0-9A-F]{6}$/i',
            'online_message' => 'required|string|max:255',
            'offline_message' => 'required|string|max:255',
            'welcome_message' => 'nullable|string|max:500',
            'show_company_logo' => 'boolean',
            'show_agent_photos' => 'boolean',
            'show_typing_indicator' => 'boolean',
            'enable_file_upload' => 'boolean',
            'enable_emoji' => 'boolean',
            'enable_sound_notifications' => 'boolean',
            'pre_chat_form_id' => 'nullable|exists:custom_forms,id',
            'offline_form_id' => 'nullable|exists:custom_forms,id',
            'auto_assign_chats' => 'boolean',
        ]);

        $company = auth()->guard('company')->user()->company;

        $settings = ChatWidgetSetting::where('company_id', $company->id)->firstOrFail();
        $settings->update($request->all());

        return back()->with('success', 'Widget settings updated successfully!');
    }

    public function preview()
    {
        $company = auth()->guard('company')->user()->company;
        $settings = ChatWidgetSetting::where('company_id', $company->id)->firstOrFail();

        return Inertia::render('company/WidgetPreview', [
            'settings' => $settings,
            'company' => $company,
        ]);
    }

    private function generateEmbedCode($companyUuid)
    {
        $appUrl = config('app.url');

        return <<<HTML
<!-- Chatterly Live Chat Widget -->
<script>
  (function(w,d,s,c){
    w.ChatterlySettings = {companyId: '{$companyUuid}'};
    var f = d.getElementsByTagName(s)[0],
        j = d.createElement(s);
    j.async = true;
    j.src = '{$appUrl}/widget.js';
    f.parentNode.insertBefore(j,f);
  })(window,document,'script');
</script>
<!-- End Chatterly Widget -->
HTML;
    }
}
