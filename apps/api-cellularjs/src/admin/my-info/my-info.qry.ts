import { Service, ServiceHandler } from '@cellularjs/net';
import { AdminData, AdminOnly } from '$share/auth';
import { SuccessData } from '$share/msg';
import { AdminProfileRepository } from 'admin/$inner/dal/admin-profile.dal';
import { MyInfoData } from '@sdks/types-admin';

@AdminOnly()
@Service({ scope: 'publish' })
export class AdminMyInfoQry implements ServiceHandler {
  constructor(
    private adminData: AdminData,
    private adminProfileRepo: AdminProfileRepository,
  ) { }

  async handle() {
    const { adminProfileRepo, adminData } = this;
    const {
      id,
      firstName,
      lastName,
      email,
      role,
      avatar,
      createdAt,
    } = await adminProfileRepo.findOneBy({ id: adminData.id });

    return SuccessData<MyInfoData>({
      id,
      firstName,
      lastName,
      email,
      role,
      avatar,
      createdAt,
    });
  }
}
