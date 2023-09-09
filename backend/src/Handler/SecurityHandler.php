<?php

namespace App\Handler;

use App\Entity\User;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use FOS\ElasticaBundle\Manager\RepositoryManagerInterface;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Serializer\SerializerInterface;

class SecurityHandler extends BaseHandler
{
    private $JWTManager;

    public function __construct(UserRepository $repository, SerializerInterface $serializer,
                                UserPasswordHasherInterface $passwordEncoder, EntityManagerInterface $em,
                                JWTTokenManagerInterface $JWTManager)
    {
        parent::__construct($repository, $serializer, $passwordEncoder, $em);
        $this->JWTManager = $JWTManager;
    }

    public function login(Request $request)
    {
        try {
            $params = json_decode($request->getContent(), true);

            if (!isset($params['username']) || !isset($params['password'])) {
                return $this->parameterMissingResponse();
            }

            $user = $this->repository->getByUsername($params['username']);

            if ($user) {
                if (!$this->passwordEncoder->isPasswordValid($user, $params['password'])) {
                    return $this->responseWithMessage('Incorrect password!', 403);
                }
                return self::getTokenUser($user);
            }

            return $this->responseWithMessage('Incorrect username!', 403);
        }
        catch(\Exception $e) {
            return $this->responseWithMessage($e->getMessage(), 400);
        }
    }

    public function getTokenUser(User $user): JsonResponse
    {
        $payload = [
            'id' => $user->getId(),
            'name' => $user->getName(),
            'surname' => $user->getSurname(),
            'username' => $user->getUsername(),
            'email' => $user->getEmail(),
            'role' => $user->getRole(),
            'userType' => $user->getUserType()
        ];
        return new JsonResponse(['token' => $this->JWTManager->createFromPayload($user, $payload)]);
    }
}
