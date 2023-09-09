<?php

namespace App\Repository;

use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;
use Knp\Component\Pager\PaginatorInterface;
use Symfony\Component\HttpFoundation\Request;

class BaseRepository extends ServiceEntityRepository
{
    protected $class;
    protected $paginator;

    public function __construct(ManagerRegistry $registry, PaginatorInterface $paginator)
    {
        parent::__construct($registry, $this->class);
        $this->paginator = $paginator;
    }

    public function get(int $id, bool $deleted = false)
    {
        return $this->findOneBy([
            'id' => $id,
            'deleted' => $deleted
        ]);
    }

    public function getAll(Request $request, bool $deleted = false)
    {
        $page = $request->query->get('page', 1);
        $perPage = $request->query->get('perPage', 10);
        $term = $request->query->get('term', '');
        $sortBy = $request->query->get('sortBy', 'date_created');
        $sortOrder = $request->query->get('sortOrder', 'DESC');
        $searchFields = $request->query->get('searchFields') !== null ? explode(",", $request->query->get('searchFields')) : [];

        $queryBuilder = $this->createQueryBuilder('entity')
            ->where('entity.deleted = :deleted')
            ->setParameter('deleted', $deleted);

        $queryBuilder->orderBy('entity.' . $sortBy, $sortOrder);

        if (!empty($term)) {
            $this->getSearchTerm($term, $searchFields, $queryBuilder);
        }

        $query = $queryBuilder->getQuery();

        $total = $this->getTotalCount($queryBuilder);
        $results = $this->paginator->paginate($query, $page, $perPage);

        return [
            'total' => $total,
            'items' => $results,
        ];
    }

    public function save($entity, bool $flush = true)
    {
        $this->getEntityManager()->persist($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }

        return $entity;
    }

    private function getSearchTerm($term, $searchFields, $queryBuilder)
    {
        if(empty($searchFields)) {
            $searchFields = $this->getClassMetadata()->getFieldNames();
        }

        $orX = $queryBuilder->expr()->orX();

        foreach ($searchFields as $field) {
            $orX->add($queryBuilder->expr()->like("entity.$field", ":term"));
        }

        $queryBuilder->andWhere($orX)->setParameter('term', '%'.$term.'%');
    }

    private function getTotalCount($queryBuilder): int
    {
        $countQueryBuilder = clone $queryBuilder;
        $countQueryBuilder->resetDQLPart('orderBy');
        $countQuery = $countQueryBuilder->select('COUNT(entity.id)')->getQuery();
        $totalCount = $countQuery->getSingleScalarResult();
        return (int) $totalCount;
    }
}