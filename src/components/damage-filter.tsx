'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { FacilityType, DamageSeverity, AcknowledgedStatus } from '@/types';
import { facilityTypes, damageSeverities, acknowledgedStatusOptions } from '@/lib/constants';
import { FilterIcon, RotateCcwIcon } from 'lucide-react';

interface DamageFilterProps {
  onFilter: (
    facilityType: FacilityType | 'all',
    damageSeverity: DamageSeverity | 'all',
    acknowledgedStatus: AcknowledgedStatus
  ) => void;
  onReset: () => void;
  isLoading: boolean;
}

export function DamageFilter({ onFilter, onReset, isLoading }: DamageFilterProps) {
  const [facilityType, setFacilityType] = useState<FacilityType | 'all'>('all');
  const [damageSeverity, setDamageSeverity] = useState<DamageSeverity | 'all'>('all');
  const [acknowledgedStatus, setAcknowledgedStatus] = useState<AcknowledgedStatus>('unacknowledged');

  const handleFilter = () => {
    onFilter(facilityType, damageSeverity, acknowledgedStatus);
  };

  const handleReset = () => {
    setFacilityType('all');
    setDamageSeverity('all');
    setAcknowledgedStatus('unacknowledged');
    onReset();
  };

  return (
    <Card className="mb-8 shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl flex items-center">
          <FilterIcon className="mr-2 h-6 w-6 text-primary" />
          유성구 관내 훼손시설물 검색
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-end">
          <div>
            <Label htmlFor="facilityType" className="text-sm font-medium">시설물 유형</Label>
            <Select value={facilityType} onValueChange={(value) => setFacilityType(value as FacilityType | 'all')}>
              <SelectTrigger id="facilityType" className="mt-1">
                <SelectValue placeholder="시설물 유형 선택" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">모든 유형</SelectItem>
                {facilityTypes.map(type => (
                  <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="damageSeverity" className="text-sm font-medium">손상 정도</Label>
            <Select value={damageSeverity} onValueChange={(value) => setDamageSeverity(value as DamageSeverity | 'all')}>
              <SelectTrigger id="damageSeverity" className="mt-1">
                <SelectValue placeholder="손상 정도 선택" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">모든 심각도</SelectItem>
                {damageSeverities.map(severity => (
                  <SelectItem key={severity.value} value={severity.value}>{severity.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="acknowledgedStatus" className="text-sm font-medium">확인 상태</Label>
            <Select value={acknowledgedStatus} onValueChange={(value) => setAcknowledgedStatus(value as AcknowledgedStatus)}>
              <SelectTrigger id="acknowledgedStatus" className="mt-1">
                <SelectValue placeholder="상태 선택" />
              </SelectTrigger>
              <SelectContent>
                {acknowledgedStatusOptions.map(option => (
                  <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex space-x-2">
            <Button onClick={handleFilter} disabled={isLoading} className="w-full md:w-auto">
              {isLoading ? '필터링 중...' : '필터 적용'}
            </Button>
            <Button onClick={handleReset} variant="outline" className="w-full md:w-auto" title="필터 초기화">
              <RotateCcwIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}