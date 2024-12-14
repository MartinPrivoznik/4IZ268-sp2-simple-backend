import * as lookupService from '../services/lookupService';
import { ApiResponse } from './dto/ApiResponse';
import { Controller, Get, Query, Route, Security, Tags } from 'tsoa';
import { ILookup } from '../models/Lookup';

@Route('api/lookup')
@Tags('Lookup')
@Security('API_KEY')
export class LookupController extends Controller {
  /**
   * Gets all lookups by type. Lookups are used for storing static data in the database. Can be either 'availability' or 'condition'.
   * @param type type of the lookup
   * @returns {ILookup[]} list of lookups
   */
  @Get()
  public async getLookupByType(
    @Query() type: string
  ): Promise<ApiResponse<ILookup[]>> {
    const lookups = await lookupService.getLookupsByType(type);
    return { success: true, data: lookups };
  }
}
