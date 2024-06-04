import React from 'react';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';

function GeneratePDFButton() {
    return (
        <Button className="mt-4 w-1/7" type="submit">
          Submit <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
        </Button>
    );
  }

export default GeneratePDFButton;