<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Log;

class ContactController extends Controller
{
    /**
     * Handle contact form submission.
     */
    public function send(Request $request)
    {
        $validated = $request->validate([
            'name'         => 'required|string|max:100',
            'organization' => 'nullable|string|max:100',
            'email'        => 'required|email|max:100',
            'phone'        => 'nullable|string|max:20',
            'service'      => 'nullable|string|max:50',
            'message'      => 'required|string|max:2000',
        ]);

        // Map service key to readable name
        $serviceMap = [
            'software'    => 'Software & Database Application',
            'gis'         => 'Geographic Information System (GIS)',
            'ecommerce'   => 'E-Commerce & Multimedia Design',
            'network'     => 'Network Design & Architecture',
            'recovery'    => 'Data Recovery & Backup',
            'maintenance' => 'Service Agreement Maintenance',
            'marketing'   => 'Digital Marketing',
            'other'       => 'Lainnya',
        ];

        $validated['service_label'] = $serviceMap[$validated['service'] ?? ''] ?? '-';

        // Send email (configure SMTP in .env)
        try {
            Mail::send('emails.contact', ['data' => $validated], function ($message) use ($validated) {
                $message->to(config('mail.to.address', 'admin@lenteracs.co.id'))
                        ->subject('Pesan Baru dari Website LCS - ' . $validated['name'])
                        ->replyTo($validated['email'], $validated['name']);
            });
        } catch (\Exception $e) {
            Log::error('Contact form mail error: ' . $e->getMessage());
        }

        return redirect()
            ->route('home', '#contact')
            ->with('success', 'Pesan Anda telah terkirim! Kami akan segera menghubungi Anda.');
    }
}