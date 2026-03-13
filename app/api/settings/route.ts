import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Settings from '@/models/Settings';

export async function GET(request: NextRequest) {
    try {
        await connectDB();
        
        let settings = await Settings.findOne();

        // If no settings document exists, create a default one
        if (!settings) {
            settings = await Settings.create({});
        }

        // Return only public settings
        const publicSettings = {
            branding: settings.branding,
            contact: settings.contact,
            social: settings.social,
            policies: {
                termsAndConditions: settings.policies.termsAndConditions,
                privacyPolicy: settings.policies.privacyPolicy,
                gstPercentage: settings.policies.gstPercentage,
                freeShippingThreshold: settings.policies.freeShippingThreshold,
                baseShippingCost: settings.policies.baseShippingCost
            }
        };

        return NextResponse.json({ success: true, settings: publicSettings });
    } catch (error) {
        console.error('Error fetching public settings:', error);
        return NextResponse.json({ success: false, message: 'Failed to fetch settings' }, { status: 500 });
    }
}
