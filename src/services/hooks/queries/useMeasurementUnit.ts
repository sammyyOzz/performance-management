import { GET_MEASUREMENT_UNIT, GET_MEASUREMENT_UNITS } from "@/constants/queryKeys";
import { useQuery } from "@tanstack/react-query";
import { getMeasurementUnit, getMeasurementUnits } from "@/services/apis/measurement-unit";
import { FetchedMeasurementUnit } from "@/types/measurement-unit";

export const useGetMeasurementUnit = (id: string) => {
    return useQuery({
        queryKey: [GET_MEASUREMENT_UNIT, id],
        queryFn: () => getMeasurementUnit(id),
        refetchOnWindowFocus: false,
        select: (res) => res?.data as any,
        retry: false,
        enabled: !!id
    });
};

export const useGetMeasurementUnits = (query: any) => {
    return useQuery({
        queryKey: [GET_MEASUREMENT_UNITS, query],
        queryFn: () => getMeasurementUnits(query),
        refetchOnWindowFocus: false,
        select: (res) => res as FetchedMeasurementUnit,
        retry: false,
    });
};