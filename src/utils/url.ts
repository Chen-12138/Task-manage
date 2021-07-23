import { useMemo } from "react";
import { URLSearchParamsInit, useSearchParams } from "react-router-dom"
import { cleanObject } from "utils";

/**
 * 返回页面url中，指定键的参数值
 */
export const useUrlQueryParam = <K extends string>(keys: K[]) => {
    const [searchParms, setSearchParms] = useSearchParams();
    return [
        useMemo(
            () => keys.reduce((prev, key) => {
                return { ...prev, [key]: searchParms.get(key) || '' }
            }, {} as { [key in K]: string }),
            // eslint-disable-next-line react-hooks/exhaustive-deps
            [searchParms]
        ),
        (params: Partial<{[key in K]: unknown}>) => {
            const o = cleanObject({...Object.fromEntries(searchParms), ...params}) as URLSearchParamsInit;
            return setSearchParms(o);
        }
    ] as const
}

// as const
let a = ['123'] as const;