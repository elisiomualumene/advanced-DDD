import { Transform } from 'class-transformer';
import { CastMemberTypes } from '../../core/cast-member/domain/cast-member-type.vo';
import { CastMemberOutput } from '../../core/cast-member/application/use-cases/common/cast-member-output';
import { CollectionPresenter } from '../shared-modules/collection.presenter';
import { ListCastMembersOutput } from '@core/cast-member/application/use-cases/list-cast-member/list-cast-member.use-case';

export class CastMemberPresenter {
  id: string;
  name: string;
  type: CastMemberTypes;
  @Transform(({ value }: { value: Date }) => {
    return value.toISOString();
  })
  created_at: Date;

  constructor(output: CastMemberOutput) {
    this.id = output.id;
    this.name = output.name;
    this.type = output.type;
    this.created_at = output.created_at;
  }
}

export class CastMemberCollectionPresenter extends CollectionPresenter {
  data: CastMemberPresenter[];
  //sugestão de reuso
  // constructor(output: CastMemberOutput[], paginationProps){

  // }

  constructor(output: ListCastMembersOutput) {
    const { items, ...paginationProps } = output;
    super(paginationProps);
    this.data = items.map((item) => new CastMemberPresenter(item));
  }
}