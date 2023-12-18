import { Resolver, Query, Args } from '@nestjs/graphql';
import { RevenueService } from './revenue.service';

@Resolver('Revenue')
export class RevenueResolver {
  constructor(private readonly revenueService: RevenueService) {}
  @Query('revenue')
  async revenue(@Args('restaurantId') restaurantId: string): Promise<any> {
    const response = await this.revenueService.revenue(restaurantId);
    return { total: response.total_revenue };
  }
  @Query('currentMonthRevenue')
  async currentMonthRevenue(
    @Args('restaurentId') restaurantId: string,
  ): Promise<any> {
    const response = await this.revenueService.currentMonthRevenue(
      restaurantId,
    );
    return { total: response.total_revenue };
  }
  @Query('previousMonthRevenue')
  async previousMonthRevenue(
    @Args('restaurentId') restaurantId: string,
  ): Promise<any> {
    const response = await this.revenueService.previousMonthRevenue(
      restaurantId,
    );
    return { total: response.total_revenue };
  }
}
